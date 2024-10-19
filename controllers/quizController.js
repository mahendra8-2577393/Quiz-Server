// quizController.js
const Quiz = require("../models/quizSchema"); // Make sure to import your Quiz model
const Leaderboard = require("../models/leaderboardSchema");
// Function to add a new quiz
const addQuiz = async (req, res) => {
  // Your existing addQuiz logic
  const { title, questions } = req.body;

  const newQuiz = new Quiz({ title, questions });
  try {
    await newQuiz.save();
    res
      .status(201)
      .json({ message: "Quiz created successfully!", quiz: newQuiz });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating quiz", error: error.message });
  }
};

// Function to get all quizzes
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find(); // Fetch all quizzes
    console.log("Fetched Quizzes:", quizzes); // Log fetched quizzes
    res.status(200).json(quizzes); // Return the quizzes as a JSON response
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getQuizQuestions = async (req, res) => {
  try {
    const quizId = req.params.id; // Get quiz ID from the request params
    console.log(quizId);
    const quiz = await Quiz.findById(quizId); // Find the quiz by ID

    if (!quiz) {
      return res.status(408).json({ message: "Quiz not found" });
    }

    res.json(quiz); // Send the entire quiz data, including questions
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// const submitScore = async (req, res) => {
//   try {
//     // Check if req.body contains the expected properties
//     const { userId, score } = req.body;

//     // Validate input
//     if (!userId || score === undefined) {
//       return res
//         .status(400)
//         .json({ message: "userId and score are required." });
//     }

//     // Fetch the user based on userId
//     const user = await User.findById(userId); // Adjust based on your User model

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Create a new submission with username and score
//     const submission = new Leaderboard({
//       username: user.username,
//       score, // Use score from request body
//       // Save the associated username
//     });

//     // Save the submission
//     await submission.save();

//     return res
//       .status(201)
//       .json({ message: "Score submitted successfully!", submission });
//   } catch (error) {
//     console.error("Error submitting score:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

module.exports = {
  addQuiz,
  getAllQuizzes,
  getQuizQuestions,
 
};
