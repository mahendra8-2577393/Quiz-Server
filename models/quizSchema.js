const mongoose = require('mongoose');

// Question Schema
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true }, // The question text
  options: { 
    type: [String], // Array of options for the question
    required: true,
    validate: [arrayLimit, '{PATH} must have at least 4 options'] // Validation to ensure there are at least 4 options
  },
  correctAnswer: { type: String, required: true } // The correct answer for the question
});

// Custom validation function for options
function arrayLimit(val) {
  return val.length >= 4; // Change this if you want a different minimum number of options
}

// Quiz Schema
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true }, // The title of the quiz
  questions: { type: [questionSchema], required: true } // Array of questions
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
