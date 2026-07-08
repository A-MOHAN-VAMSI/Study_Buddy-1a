const User = require('./User');
const Exam = require('./Exam');
const Question = require('./Question');
const Attempt = require('./Attempt');
const AttemptAnswer = require('./AttemptAnswer');

// User -> Exam (Created by Admin)
Exam.hasMany(Attempt, {
    foreignKey: "examId",
    as: "attempts"
});
Exam.hasMany(Question, {
    foreignKey: "examId",
    as: "questions"
});

Question.belongsTo(Exam, {
    foreignKey: "examId",
    as: "exam"
});

Attempt.belongsTo(Exam, {
    foreignKey: "examId",
    as: "exam"
});

User.hasMany(Attempt, {
    foreignKey: "studentId",
    as: "attempts"
});

Attempt.belongsTo(User, {
    foreignKey: "studentId",
    as: "student"
});

Attempt.hasMany(AttemptAnswer, {
    foreignKey: "attemptId",
    as: "answers"
});

AttemptAnswer.belongsTo(Attempt, {
    foreignKey: "attemptId",
    as: "attempt"
});

Question.hasMany(AttemptAnswer, {
    foreignKey: "questionId",
    as: "attemptAnswers"
});

AttemptAnswer.belongsTo(Question, {
    foreignKey: "questionId",
    as: "question"
});

module.exports = {
  User,
  Exam,
  Question,
  Attempt,
  AttemptAnswer
};
