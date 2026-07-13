const { Exam, Question, Attempt, AttemptAnswer } = require('../models');

// @desc    Create a new exam
// @route   POST /api/exams
// @access  Private/Admin
const createExam = async (req, res) => {
  try {
    const { title, description, duration, passingScore, questions } = req.body;

    if (!title || !duration) {
      return res.status(400).json({ message: 'Title and duration are required' });
    }

    // Create the exam
    const exam = await Exam.create({
      title,
      description,
      duration,
      passingScore: passingScore || 40,
      createdBy: req.user.id
    });

    // Create questions if provided
    if (questions && questions.length > 0) {
      const questionsWithExamId = questions.map(q => ({
        ...q,
        examId: exam.id,
        // options is already array, Sequelize JSON type will serialize it
      }));
      await Question.bulkCreate(questionsWithExamId);
    }

    const fullExam = await Exam.findByPk(exam.id, {
      include: [{ model: Question, as: 'questions' }]
    });

    res.status(201).json(fullExam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all exams
// @route   GET /api/exams
// @access  Private
const getExams = async (req, res) => {
  try {
    const exams = await Exam.findAll({
      include: [
        {
          model: Question,
          as: 'questions',
          attributes: ['id'] // Just return counts or id list for lightweight fetch
        }
      ]
    });
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single exam by ID
// @route   GET /api/exams/:id
// @access  Private
const getExamById = async (req, res) => {
  try {
    const examId = req.params.id;
    const isAdmin = req.user.role === 'admin';

    const exam = await Exam.findByPk(examId, {
      include: [
        {
          model: Question,
          as: 'questions',
          // Strip out correct answer for students to prevent source code inspection cheat
          attributes: isAdmin 
            ? ['id', 'questionText', 'type', 'options', 'correctAnswer', 'points'] 
            : ['id', 'questionText', 'type', 'options', 'points']
        }
      ]
    });

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an exam
// @route   PUT /api/exams/:id
// @access  Private/Admin
const updateExam = async (req, res) => {
  try {
    const examId = req.params.id;
    const { title, description, duration, passingScore, questions } = req.body;

    const exam = await Exam.findByPk(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Update basic details
    await exam.update({
      title: title || exam.title,
      description: description !== undefined ? description : exam.description,
      duration: duration || exam.duration,
      passingScore: passingScore || exam.passingScore
    });

    // If questions are provided, replace them
    if (questions) {
      // Delete existing questions
      await Question.destroy({ where: { examId } });

      // Create new ones
      const questionsWithExamId = questions.map(q => ({
        ...q,
        examId: exam.id
      }));
      await Question.bulkCreate(questionsWithExamId);
    }

    const updatedExam = await Exam.findByPk(exam.id, {
      include: [{ model: Question, as: 'questions' }]
    });

    res.status(200).json(updatedExam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an exam
// @route   DELETE /api/exams/:id
// @access  Private/Admin
const deleteExam = async (req, res) => {
  try {
    const deleted = await Exam.destroy({
      where: {
        id: req.params.id
      }
    });

    console.log("Deleted rows:", deleted);

    res.json({
      deleted
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message
    });
  }
};

// @desc    Submit answers for an exam & auto-grade
// @route   POST /api/exams/:id/submit
// @access  Private
const submitExam = async (req, res) => {
  try {
    const examId = req.params.id;
    const studentId = req.user.id;
    const { answers, startedAt } = req.body; // Array of { questionId, studentAnswer }

    const exam = await Exam.findByPk(examId, {
      include: [{ model: Question, as: 'questions' }]
    });

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    let totalPoints = 0;
    let earnedPoints = 0;
    const gradedAnswers = [];

    // Map answers for quick lookup
    const answerMap = {};
    if (answers && Array.isArray(answers)) {
      answers.forEach(ans => {
        answerMap[ans.questionId] = ans.studentAnswer;
      });
    }

    // Grade each question
    exam.questions.forEach(question => {
      totalPoints += question.points;
      const studentAns = answerMap[question.id] || '';
      
      let isCorrect = false;
      if (question.type === 'mcq') {
        // Strict trimmed exact match for MCQ
        isCorrect = String(studentAns).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
      } else {
        // Text/Short answer trimmed case-insensitive partial/exact match
        isCorrect = String(studentAns).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
      }

      if (isCorrect) {
        earnedPoints += question.points;
      }

      gradedAnswers.push({
        questionId: question.id,
        studentAnswer: studentAns,
        isCorrect,
        correctAnswer: question.correctAnswer // We return the correct answers now that they have submitted
      });
    });

    const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed = percentage >= exam.passingScore;

    // Save attempt
    const attempt = await Attempt.create({
      studentId,
      examId,
      score: earnedPoints,
      percentage: Math.round(percentage * 100) / 100, // round to 2 decimal places
      passed,
      startedAt: startedAt ? new Date(startedAt) : new Date(),
      submittedAt: new Date()
    });

    // Save attempt answers
    const answersToCreate = gradedAnswers.map(ans => ({
      attemptId: attempt.id,
      questionId: ans.questionId,
      studentAnswer: ans.studentAnswer
    }));

    await AttemptAnswer.bulkCreate(answersToCreate);

    res.status(201).json({
      attemptId: attempt.id,
      score: earnedPoints,
      totalPoints,
      percentage: attempt.percentage,
      passed,
      submittedAt: attempt.submittedAt,
      details: gradedAnswers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  submitExam
};
