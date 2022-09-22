require("dotenv").config();
const express = require("express");
const app = express();
const dbConnection = require("./db");
const controllers = require("./controllers");

app.use(express.json());

app.use("/user", controllers.userController);
app.use("/task", controllers.taskController);
app.use("/category", controllers.categoryController);

dbConnection
  .authenticate()
  .then(
    () => dbConnection.sync()
    // {force: true,}
  )
  .then(() => {
    app.listen(3000, () => {
      console.log(`[Server]: App is listening on 3000.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });
