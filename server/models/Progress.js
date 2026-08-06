const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    stack: {
      solvedProblems: {
        type: [String],
        default: []
      }
    },

    queue: {
      solvedProblems: {
        type: [String],
        default: []
      }
    },

    sorting: {
      solvedProblems: {
        type: [String],
        default: []
      }
    },

    searching: {
      solvedProblems: {
        type: [String],
        default: []
      }
    }
  },
  {
    timestamps: true
  }
);

const Progress = mongoose.model(
  "Progress",
  progressSchema
);

module.exports = Progress;