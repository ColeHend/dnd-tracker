const bcrypt = require("bcrypt");
const { sequelize} = require("../sequel");

const Login = (req, res) => {
  const { username, password } = req.body;
  sequelize
    .query(`SELECT * FROM users WHERE username=?`, {
      replacements: [username],
    })
    .then((dbRes) => {
      const exists = bcrypt.compareSync(password, dbRes[0][0].user_password);

      if (dbRes[0][0].username === username && exists) {
        let user = {
          loggedIn: true,
          user_id: dbRes[0][0].user_id,
          username: dbRes[0][0].username,
        };
        console.log(user);
        req.user = user;
        req.session.user = user;
        console.log("------------REQUEST LOGIN------------");
        console.log(req.sessionID);
        console.log(req.session);
        console.log(req.user);
        console.log(req.session.user);
        console.log("-------------------------------");
        res.status(200).send(dbRes[0][0]);

      } else {
        res.status(200).send("Incorrect Login Info");
      }
    })
    .catch((err) => console.log(err));
};

const Register = (req, res) => {
  const { username, password, passwordConf } = req.body;
  if (password === passwordConf) {
    const salt = bcrypt.genSaltSync(10);
    const passHash = bcrypt.hashSync(password, salt);
    sequelize
      .query("INSERT INTO users(username,user_password) VALUES(?,?);", {
        replacements: [username, passHash],
      })
      .then((dbRes) => {
        console.log(dbRes);

        res.status(200).send(dbRes[0][0]);
      })
      .catch((err) => console.log(err));
  } else {
    res.send(400).send("passwords don't match");
  }
};
const Logout = (req, res) => {
  if (req.session) {
    console.log("REQ.session: ", req.session);
    req.session.destroy((err) => console.log(err));
  }
  res.status(200).redirect("/");
};
module.exports = { Login, Register, Logout };
