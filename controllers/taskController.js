const router = require("express").Router();
const { TaskModel } = require("../models");

router.post("/", async (req, res) => {
  const { title, description, importanceRating, urgencyRating, completed } =
    req.body.task;

  try {
    const Task = await TaskModel.create({
      title: title,
      description: description,
      importanceRating: importanceRating,
      urgencyRating: urgencyRating,
      completed: completed,
    });

    res.status(201).json({
      message: "Task successfully created.",
      task: Task,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to create task in database. Error: ${err}.`,
    });
  }
});

// TODO: Read instance with get method

// TODO: Update instance with put method

// TODO: Delete instance with delete method

module.exports = router;
