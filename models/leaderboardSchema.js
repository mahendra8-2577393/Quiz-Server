// models/leaderboardSchema.js
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const leaderboardSchema = new mongoose.Schema({
  username: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
