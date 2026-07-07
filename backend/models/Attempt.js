const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Attempt = sequelize.define('Attempt', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  examId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  score: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  percentage: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  passed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  submittedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Attempt;
