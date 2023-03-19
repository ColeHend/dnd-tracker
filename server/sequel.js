const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
// @ts-ignore
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  storage: "./session.postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const theUser = sequelize.define("Session", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: Sequelize.STRING,
  username: Sequelize.STRING,
  loggedIn: Sequelize.BOOLEAN,
});
const daSequel = () => sequelize;
module.exports = { theUser, daSequel: sequelize, sequelize };
