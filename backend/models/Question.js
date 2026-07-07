const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  examId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  questionText: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('mcq', 'short'),
    defaultValue: 'mcq'
  },
  options: {
    type: DataTypes.JSON, // Stores an array of options [ "Option A", "Option B", ... ]
    allowNull: true
  },
  correctAnswer: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
}, {
  timestamps: true
});

module.exports = Question;
