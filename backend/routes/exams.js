const express = require('express');
const router = express.Router();
const {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  submitExam
} = require('../controllers/examController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getExams)
  .post(protect, adminOnly, createExam);

router.route('/:id')
  .get(protect, getExamById)
  .put(protect, adminOnly, updateExam)
  .delete(protect, adminOnly, deleteExam);

router.post('/:id/submit', protect, submitExam);

module.exports = router;
