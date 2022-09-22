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

// TODO: Read all instances of categories with get

// TODO: Read single instance of category with get

// TODO: Update instance of category with put

// TODO: Delete instance of category with delete

module.exports = router;
