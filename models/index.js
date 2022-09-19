const UserModel = require("./user");
const TaskModel = require("./task");

UserModel.hasMany(TaskModel);
TaskModel.belongsTo(UserModel);
