const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const {
    username,
    password,
    email,
    phoneNumber,
    notifications,
    notificationPreference,
    isAdmin,
  } = req.body.user;

  try {
    const User = await UserModel.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 13),
      phoneNumber: phoneNumber,
      notifications: notifications,
      notificationPreference: notificationPreference,
      isAdmin: isAdmin,
    });

    let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      message: "User successfully registered account.",
      user: User,
      sessionToken: token,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: `Email is already in use and must be unique.`,
      });
    } else {
      res.status(500).json({
        message: `Failed to create user account. Error: ${err}.`,
      });
    }
  }
});

// TODO: Create .post for user login
// router.post("/login", async ( req, res ) => {

// })

router.get("/:id", async (req, res) => {
  try {
    const User = await UserModel.findOne({ where: { id: req.params.id } });

    res.status(201).json({
      message: "User account found in database.",
      user: User,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to locate user in database. Error: ${err}.`,
    });
  }
});

router.put("/:id", async (req, res) => {
  const {
    username,
    password,
    email,
    phoneNumber,
    notifications,
    notificationPreference,
    isAdmin,
  } = req.body.user;

  const User = await UserModel.findOne({ where: { id: req.params.id } });

  const updateData = {
    username: username,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    notifications: notifications,
    notificationPreference: notificationPreference,
    isAdmin: isAdmin,
  };

  User.set(updateData);

  try {
    const updateUser = await User.save();
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json({
      message: `Unable to update user account information. Error: ${err}.`,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const User = await UserModel.findOne({ where: { id: req.params.id } });

  try {
    await User.destroy();
    res.status(200).json({
      message: `User account deleted. User ID ${User.dataValues.id} removed from database.`,
    });
  } catch (err) {
    res.status(500).json({
      message: `Unable to delete user. Error: ${err}.`,
    });
  }
});

module.exports = router;
