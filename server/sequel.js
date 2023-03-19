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
async function sequelTest() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
sequelTest();
sequelize.sync()
const daSequel = () => sequelize;
module.exports = { daSequel, sequelize, sequelTest };
