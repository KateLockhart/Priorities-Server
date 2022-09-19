const { Sequelize } = require("sequelize");
const { dbUsername, dbPassword, host, port } = process.env;

if (!dbUsername) throw new EnvError("username");
if (!dbPassword) throw new EnvError("password");
if (!host) throw new EnvError("host");
if (!port) throw new EnvError("port");

const db = new Sequelize({
  dialect: "postgres",
  username: dbUsername,
  password: dbPassword,
  host,
  port,
});

class EnvError extends Error {
  constructor(envVar) {
    this.message = `Missing needed env var: ${envVar}`;
    this.name = "EnvError";
  }
}

module.exports = db;
