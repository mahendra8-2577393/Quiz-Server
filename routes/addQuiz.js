const express = require("express");
const {
  addQuiz,
  getAllQuizzes,
  getQuizQuestions,
  submitScore,
} = require("../controllers/quizController");
const {
  registerUser,
  loginUser,
  adminOnly,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

// Add quiz (admin only)
router.post("/add-quiz", auth, addQuiz);

// Get all quizzes
router.get("/quizzes", getAllQuizzes);

// Test route
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Chal padha" });
});

// Get quiz questions by quizId
router.get("/quizzes/:id", getQuizQuestions); // Route for fetching quiz by ID
// router.post("/submitScore", submitScore);

module.exports = router;
