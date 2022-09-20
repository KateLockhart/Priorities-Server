const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");

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

  //   console.log(req.body.user);

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

// TODO: Create .get for retrieving user data
router.get("/:id", async (req, res) => {
  try {
    const User = await UserModel.findOne({ where: { id: req.params.id } });

    // console.log(User);

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

// TODO: Create a .put to update user data

// TODO: Create a .delete to delete user data

module.exports = router;
