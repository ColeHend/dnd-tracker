const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
// @ts-ignore
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
const daSequel = () => sequelize;
module.exports = { daSequel, sequelize };
