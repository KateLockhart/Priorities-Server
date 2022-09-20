const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");

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
// router.post("/", async ( req, res ) => {

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
      message: `Failed to locate user in database. \r\n Error: ${err}.`,
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

// TODO: Create a .delete to delete user data
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
