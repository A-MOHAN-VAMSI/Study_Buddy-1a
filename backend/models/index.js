const User = require('./User');
const Exam = require('./Exam');
const Question = require('./Question');
const Attempt = require('./Attempt');
const AttemptAnswer = require('./AttemptAnswer');

// User -> Exam (Created by Admin)
User.hasMany(Exam, { foreignKey: 'createdBy', as: 'createdExams' });
Exam.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

// Exam -> Question
Exam.hasMany(Question, { foreignKey: 'examId', as: 'questions', onDelete: 'CASCADE' });
Question.belongsTo(Exam, { foreignKey: 'examId', as: 'exam' });

// Student -> Attempt
User.hasMany(Attempt, { foreignKey: 'studentId', as: 'attempts' });
Attempt.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

// Exam -> Attempt
Exam.hasMany(Attempt, { foreignKey: 'examId', as: 'attempts', onDelete: 'CASCADE' });
Attempt.belongsTo(Exam, { foreignKey: 'examId', as: 'exam' });

// Attempt -> AttemptAnswer
Attempt.hasMany(AttemptAnswer, { foreignKey: 'attemptId', as: 'answers', onDelete: 'CASCADE' });
AttemptAnswer.belongsTo(Attempt, { foreignKey: 'attemptId', as: 'attempt' });

// Question -> AttemptAnswer
Question.hasMany(AttemptAnswer, { foreignKey: 'questionId', as: 'questionAnswers', onDelete: 'CASCADE' });
AttemptAnswer.belongsTo(Question, { foreignKey: 'questionId', as: 'question' });

module.exports = {
  User,
  Exam,
  Question,
  Attempt,
  AttemptAnswer
};
