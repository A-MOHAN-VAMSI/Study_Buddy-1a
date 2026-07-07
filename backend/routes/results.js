const express = require('express');
const router = express.Router();
const {
  getStudentResults,
  getAttemptDetails,
  getExamResults,
  getOverallAnalytics
} = require('../controllers/resultController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/student', protect, getStudentResults);
router.get('/attempt/:id', protect, getAttemptDetails);
router.get('/exam/:examId', protect, adminOnly, getExamResults);
router.get('/analytics', protect, adminOnly, getOverallAnalytics);

module.exports = router;
