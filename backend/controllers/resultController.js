const { Attempt, Exam, User, AttemptAnswer, Question } = require('../models');
const { Op } = require('sequelize');

// @desc    Get logged in student's attempts
// @route   GET /api/results/student
// @access  Private
const getStudentResults = async (req, res) => {
  try {
    const attempts = await Attempt.findAll({
      where: { studentId: req.user.id },
      include: [
        {
          model: Exam,
          as: 'exam',
          attributes: ['title', 'duration', 'passingScore']
        }
      ],
      order: [['submittedAt', 'DESC']]
    });
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get detailed analysis of a student attempt
// @route   GET /api/results/attempt/:id
// @access  Private
const getAttemptDetails = async (req, res) => {
  try {
    const attemptId = req.params.id;
    const attempt = await Attempt.findByPk(attemptId, {
      include: [
        {
          model: Exam,
          as: 'exam',
          attributes: ['title', 'description', 'duration', 'passingScore']
        },
        {
          model: User,
          as: 'student',
          attributes: ['name', 'email']
        },
        {
          model: AttemptAnswer,
          as: 'answers',
          include: [
            {
              model: Question,
              as: 'question',
              attributes: ['questionText', 'type', 'options', 'correctAnswer', 'points']
            }
          ]
        }
      ]
    });

    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    // Security: Students can only view their own attempts. Admins can view any.
    if (req.user.role !== 'admin' && attempt.studentId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this result' });
    }

    res.status(200).json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all exam attempts (Admin)
// @route   GET /api/results/exam/:examId
// @access  Private/Admin
const getExamResults = async (req, res) => {
  try {
    const attempts = await Attempt.findAll({
      where: { examId: req.params.examId },
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['name', 'email']
        }
      ],
      order: [['submittedAt', 'DESC']]
    });
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get system overall analytics (Admin)
// @route   GET /api/results/analytics
// @access  Private/Admin
const getOverallAnalytics = async (req, res) => {
  try {
    // 1. Total Student Count
    const studentCount = await User.count({ where: { role: 'student' } });

    // 2. Total Exams
    const examCount = await Exam.count();

    // 3. Total Attempts
    const attemptCount = await Attempt.count();

    // 4. Passed Attempts
    const passedCount = await Attempt.count({ where: { passed: true } });
    const passRate = attemptCount > 0 ? Math.round((passedCount / attemptCount) * 100) : 0;

    // 5. Average Score
    const attempts = await Attempt.findAll({ attributes: ['percentage'] });
    const avgScore = attempts.length > 0 
      ? Math.round(attempts.reduce((sum, att) => sum + att.percentage, 0) / attempts.length) 
      : 0;

    // 6. Grade Distribution
    const distribution = {
      excellent: 0, // 80-100
      good: 0,      // 60-79
      average: 0,   // 40-59
      poor: 0       // 0-39
    };

    attempts.forEach(att => {
      if (att.percentage >= 80) distribution.excellent++;
      else if (att.percentage >= 60) distribution.good++;
      else if (att.percentage >= 40) distribution.average++;
      else distribution.poor++;
    });

    // 7. Exam Performance Summary
    const exams = await Exam.findAll({
      attributes: ['id', 'title'],
      include: [{ model: Attempt, as: 'attempts', attributes: ['percentage', 'passed'] }]
    });

    const examStats = exams.map(e => {
      const atts = e.attempts || [];
      const count = atts.length;
      const pass = atts.filter(a => a.passed).length;
      const pr = count > 0 ? Math.round((pass / count) * 100) : 0;
      const avg = count > 0 ? Math.round(atts.reduce((sum, a) => sum + a.percentage, 0) / count) : 0;

      return {
        id: e.id,
        title: e.title,
        attemptCount: count,
        passRate: pr,
        averageScore: avg
      };
    });

    // 8. Recent attempts
    const recentAttempts = await Attempt.findAll({
      limit: 5,
      order: [['submittedAt', 'DESC']],
      include: [
        { model: User, as: 'student', attributes: ['name', 'email'] },
        { model: Exam, as: 'exam', attributes: ['title'] }
      ]
    });

    res.status(200).json({
      summary: {
        studentCount,
        examCount,
        attemptCount,
        passRate,
        avgScore
      },
      distribution,
      examStats,
      recentAttempts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudentResults,
  getAttemptDetails,
  getExamResults,
  getOverallAnalytics
};
