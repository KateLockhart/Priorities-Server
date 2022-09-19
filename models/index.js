const UserModel = require("./user");
const TaskModel = require("./task");
const CategoryModel = require("./category");

UserModel.hasMany(TaskModel);
UserModel.hasMany(CategoryModel);
TaskModel.belongsTo(UserModel);
CategoryModel.hasMany(TaskModel);
