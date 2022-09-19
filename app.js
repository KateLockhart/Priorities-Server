require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");
// TODO: Temp here to register tables, move once controllers are added
const userModel = require("./models/user");
// const controllers = require("./controllers");

app.use(Express.json());

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(3000, () => {
      console.log(`[Server]: App is listening on 3000.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });
