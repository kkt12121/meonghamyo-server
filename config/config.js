const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.name,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
    host: process.env.host,
    dialect: "mysql",
    logging: false,
    operatorAliases: false,
  },
  test: {
    username: process.env.name,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
    host: process.env.host,
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: process.env.name,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
    host: process.env.host,
    dialect: "mysql",
    logging: false,
    operatorAliases: false,
  },
};
