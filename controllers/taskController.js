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

// TODO: Change to not use route param, use validateJWT once constructed, final route of "/"
router.get("/all/:userId", async (req, res) => {
  try {
    const Tasks = await TaskModel.findAll({
      // TODO: where value will change to { userId: id }
      where: { userId: null },
    });

    res.status(200).json({
      message: "All tasks found in database.",
      tasks: Tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to locate tasks in database. Error: ${err}.`,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const Task = await TaskModel.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      message: "Task successfully found in database.",
      task: Task,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to locate task in database. Error: ${err}.`,
    });
  }
});

// TODO: Update instance with put method
router.put("/:id", async (req, res) => {
  const { title, description, importanceRating, urgencyRating, completed } =
    req.body.task;

  const Task = await TaskModel.findOne({
    where: { id: req.params.id },
  });

  const updateTask = {
    title: title,
    description: description,
    importanceRating: importanceRating,
    urgencyRating: urgencyRating,
    completed: completed,
  };

  Task.set(updateTask);

  try {
    const updateTask = await Task.save();
    res.status(201).json({
      message: "Task updated successfully.",
      updateTask,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update task in database. Error: ${err}.`,
    });
  }
});

// TODO: Delete instance with delete method

module.exports = router;
