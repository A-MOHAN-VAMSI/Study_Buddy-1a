const { User, Attempt, Exam } = require("../models");

// GET /api/admin/students
const getStudents = async (req, res) => {
  try {
    const students = await User.findAll({
      where: {
        role: "student",
      },
      include: [
        {
          model: Attempt,
          as: "attempts",
          include: [
            {
              model: Exam,
              as: "exam",
              attributes: ["title"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const data = students.map((student) => {
      const attempts = student.attempts || [];

      const totalAttempts = attempts.length;

      const passedAttempts = attempts.filter(
        (a) => a.passed
      ).length;

      const averageScore =
        totalAttempts > 0
          ? Math.round(
              attempts.reduce(
                (sum, a) => sum + a.percentage,
                0
              ) / totalAttempts
            )
          : 0;

      const latestAttempt =
        totalAttempts > 0
          ? attempts.sort(
              (a, b) =>
                new Date(b.submittedAt) -
                new Date(a.submittedAt)
            )[0]
          : null;

      return {
        id: student.id,
        name: student.name,
        email: student.email,

        totalAttempts,

        passedAttempts,

        averageScore,

        latestExam:
          latestAttempt?.exam?.title || "-",

        latestScore:
          latestAttempt?.percentage || 0,
      };
    });

    res.json(data);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message,
    });

  }
};
// GET /api/admin/students/:id
const getStudentProfile = async (req, res) => {
  try {
    const student = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "createdAt"],
      include: [
        {
          model: Attempt,
          as: "attempts",
          include: [
            {
              model: Exam,
              as: "exam",
              attributes: ["title"],
            },
          ],
          order: [["submittedAt", "DESC"]],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const attempts = student.attempts || [];

    const totalAttempts = attempts.length;

    const passedAttempts = attempts.filter(
      (a) => a.passed
    ).length;

    const averageScore =
      totalAttempts > 0
        ? Math.round(
            attempts.reduce(
              (sum, a) => sum + a.percentage,
              0
            ) / totalAttempts
          )
        : 0;

    res.json({
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        joined: student.createdAt,
      },

      summary: {
        totalAttempts,
        passedAttempts,
        averageScore,
      },

      history: attempts.map((a) => ({
        id: a.id,
        exam: a.exam?.title || "Unknown Exam",
        score: a.percentage,
        passed: a.passed,
        submittedAt: a.submittedAt,
      })),
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message,
    });

  }
};

module.exports = {
  getStudents,
    getStudentProfile,
};