const router = require("express").Router();
const { CategoryModel } = require("../models");

router.post("/", async (req, res) => {
  const { title, color } = req.body.category;

  try {
    const Category = await CategoryModel.create({
      title: title,
      color: color,
    });

    res.status(201).json({
      message: "Category successfully created.",
      category: Category,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to create category in database. Error ${err}.`,
    });
  }
});

// TODO: Change to not use route param, use validateJWT once constructed, final route of "/"
router.get("/all/:userId", async (req, res) => {
  try {
    const Categories = await CategoryModel.findAll({
      // TODO: where value will change to { userId: id }
      where: { userId: null },
    });

    res.status(200).json({
      message: "All tasks found in database.",
      categories: Categories,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to locate categories in database. Error: ${err}.`,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const Category = await CategoryModel.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      message: "Category successfully found in database.",
      category: Category,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to locate category in database. Error: ${err}.`,
    });
  }
});

// TODO: Update instance of category with put

// TODO: Delete instance of category with delete

module.exports = router;
