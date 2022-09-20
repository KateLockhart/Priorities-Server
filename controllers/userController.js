const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");

// TODO: Create .post for user registration
router.post("/", async (req, res) => {
  let {
    username,
    password,
    email,
    phoneNumber,
    notifications,
    notificationPreference,
    isAdmin,
  } = req.body.user;
  console.log(req.body.user);
  try {
    const User = await UserModel.create({
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      notifications: notifications,
      notificationPreference: notificationPreference,
      isAdmin: isAdmin,
    });

    res.status(201).json({
      message: "User successfully registered account.",
      user: User,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: `${UniqueConstraintError.cause} is already in use and must be unique.`,
      });
    } else {
      res.status(500).json({
        message: `Failed to create user account. \r\n Error: ${err}.`,
      });
    }
  }
});

// TODO: Create .post for user login

// TODO: Create .get for retrieving user data

// TODO: Create a .put to update user data

// TODO: Create a .delete to delete user data

module.exports = router;
