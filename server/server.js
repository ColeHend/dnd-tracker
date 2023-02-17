require("dotenv").config();
const { Login, Register, Logout } = require("./controllers/loginControllers");
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const { daSequel } = require("./sequel");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const cookieParser = require("cookie-parser");
const mySqlStore = new SequelizeStore({
  db: daSequel(),
});
const PORT = process.env.PORT || 4000;
const { SECRET } = process.env;
const oneDay = 1000 * 60 * 60 * 24;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  session({
    // @ts-ignore
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: mySqlStore,
    proxy: false,
    // @ts-ignore
    cookie: { maxAge: oneDay, user_id: 0, username: "" },
  })
);
mySqlStore.sync();
//-------------
//  User Login EndPoints
//-------
// body object: {username: insert_username, password: insert_password}
// returns: {user_id, username, user_password?}
app.post("/login", Login);

// body object: {username: insert_username, password: insert_password, passwordConf: insert_passwordConf}
// returns: {user_id, username, user_password?}
app.post("/register", Register);

// body object: N/A
// returns: N/A
app.post("/logout", Logout);
//--------------
// Project Endpoints
//--------

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
