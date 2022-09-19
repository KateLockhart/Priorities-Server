const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  notifications: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  notificationPreference: {
    type: DataTypes.ENUM("email", "phone"),
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
