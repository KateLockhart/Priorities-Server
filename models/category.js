const { DataTypes } = require("sequelize");
const db = require("../db");

const Category = db.define("category", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Category;
