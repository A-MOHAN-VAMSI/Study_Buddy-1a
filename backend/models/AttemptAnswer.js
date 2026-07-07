const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AttemptAnswer = sequelize.define('AttemptAnswer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  attemptId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  questionId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  studentAnswer: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = AttemptAnswer;
