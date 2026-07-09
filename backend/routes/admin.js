const express = require("express");

const router = express.Router();

const {
  getStudents,
    getStudentProfile,
} = require("../controllers/adminController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.get(
    "/students",
    protect,
    adminOnly,
    getStudents
);
router.get(
    "/students/:id",
    protect,
    adminOnly,
    getStudentProfile
);

module.exports = router;