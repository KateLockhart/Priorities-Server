const { DataTypes } = require("sequelize");
const db = require("../db");

const Task = db.define("task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  importanceRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  urgencyRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Task;
