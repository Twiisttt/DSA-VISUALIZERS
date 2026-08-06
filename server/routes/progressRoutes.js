const express = require("express");

const Progress = require("../models/Progress");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Valid topics
const allowedTopics = [
  "stack",
  "queue",
  "sorting",
  "searching"
];


// ======================================================
// GET USER PROGRESS
// GET /api/progress
// ======================================================

router.get("/", authMiddleware, async (req, res) => {

  try {

    let progress = await Progress.findOne({
      userId: req.userId
    });


    // New user → create empty progress
    if (!progress) {

      progress = await Progress.create({
        userId: req.userId
      });

    }


    res.status(200).json({
      success: true,
      progress
    });


  } catch (error) {

    console.error(
      "Get progress error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});


// ======================================================
// MARK PROBLEM AS SOLVED
// PUT /api/progress/solve
// ======================================================

router.put(
  "/solve",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        topic,
        problemId
      } = req.body;


      // -----------------------------
      // Validate topic
      // -----------------------------

      if (!allowedTopics.includes(topic)) {

        return res.status(400).json({
          success: false,
          message: "Invalid topic"
        });

      }


      // -----------------------------
      // Validate problem ID
      // -----------------------------

      if (!problemId) {

        return res.status(400).json({
          success: false,
          message: "Problem ID is required"
        });

      }


      // -----------------------------
      // Find progress
      // -----------------------------

      let progress = await Progress.findOne({
        userId: req.userId
      });


      // New user
      if (!progress) {

        progress = await Progress.create({
          userId: req.userId
        });

      }


      // -----------------------------
      // Check if already solved
      // -----------------------------

      const alreadySolved =
        progress[topic].solvedProblems.includes(
          problemId
        );


      if (!alreadySolved) {

        progress[topic].solvedProblems.push(
          problemId
        );

        await progress.save();

      }


      res.status(200).json({
        success: true,
        message: "Problem marked as solved",
        progress
      });


    } catch (error) {

      console.error(
        "Solve problem error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Server error"
      });

    }

  }
);


// ======================================================
// MARK PROBLEM AS UNSOLVED
// PUT /api/progress/unsolve
// ======================================================

router.put(
  "/unsolve",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        topic,
        problemId
      } = req.body;


      // -----------------------------
      // Validate topic
      // -----------------------------

      if (!allowedTopics.includes(topic)) {

        return res.status(400).json({
          success: false,
          message: "Invalid topic"
        });

      }


      // -----------------------------
      // Validate problem ID
      // -----------------------------

      if (!problemId) {

        return res.status(400).json({
          success: false,
          message: "Problem ID is required"
        });

      }


      // -----------------------------
      // Find progress
      // -----------------------------

      const progress = await Progress.findOne({
        userId: req.userId
      });


      if (!progress) {

        return res.status(404).json({
          success: false,
          message: "Progress not found"
        });

      }


      // -----------------------------
      // Remove problem
      // -----------------------------

      progress[topic].solvedProblems =
        progress[topic].solvedProblems.filter(
          (id) => id !== problemId
        );


      await progress.save();


      res.status(200).json({
        success: true,
        message: "Problem marked as unsolved",
        progress
      });


    } catch (error) {

      console.error(
        "Unsolve problem error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Server error"
      });

    }

  }
);


module.exports = router;