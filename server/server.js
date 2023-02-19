require("dotenv").config();
const { Login, Register, Logout } = require("./controllers/loginControllers");
const create = require("./controllers/createController");
const get = require("./controllers/getController");
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
// Create
//--------
// ----- project-access --------
// body object: {
//  project_group_id: project_id,
//  project_group_access: user_id
// }
// returns: N/A
app.post("/api/project-access", create.projectAccess);

// ----- projects --------
// makes group, then group access, then project
// body object: {
//  project_group_id: project_group_id, (optional)
//  project_owner: user_id,
//  project_group_access: [user_id]
//  project_name: project_name,
//  project_desc: description
// }
// returns: {
//   project_id,
//   project_group_id,
//   project_name,
//   project_desc,
// }
app.post("/api/projects", create.project);

// ----- spells --------
// body object: {
//    project_id: project_id,
//    spell_owner: user_id
//    spell_title: (100 characters)
//    spell_subhead: (100 characters)
//    spell_desc: description
// }
// returns: {
// }
app.post("/spells", create.spells);

// ----- feats --------
// body object: {
//    project_id: project_id,
//    feat_owner: user_id
//    feat_title: (100 characters)
//    feat_subhead: (100 characters)
//    feat_desc: description
// }
// returns: {
// }
app.post("/feats", create.feats);

// ----- classes --------
// body object: {
//    project_id: project_id,
//    class_owner: user_id
//    class_name: (100 characters)
//    class_hd: (4 characters)
//    class_armor: [(30 characters)]
//    class_weap: [(30 characters)]
//    class_tools: [(30 characters)]
//    class_skills: [(30 characters)]
//    class_abilities_abl: [abiltity_id]
// }
// returns: {
// }
app.post("/classes", create.classes);

// ----- subclasses ------
// body object: {
//    project_id: project_id,
//    subclass_owner: user_id
//    subclass_name: (50 characters)
//    subclass_desc: description
//    subclass_abilities_abl: [abiltity_id]
// }
// returns: {
// }
app.post("/subclasses", create.subclasses);

// ----- abilities --------
// body object: {
//    project_id: project_id,
//    ability_owner: user_id
//    ability_name: (50 characters)
//    ability_subhead: (100 characters)
//    ability_description: description
// }
// returns: {
// }
app.post("/abilities", create.abilities);

//--------
// Read
//--------
app.get("/project-access/:id", get.projectAccess);
app.get("/projects/:userid", get.project); // works
app.get("/spells/:id", get.spells);
app.get("/feats/:id", get.feats);
app.get("/classes/:id", get.classes);
app.get("/subclasses/:id", get.subclasses);
app.get("/abilities/:id", get.abilities);
//--------
// Update
//--------
app.put("/project-access");
app.put("/projects");
app.put("/spells");
app.put("/feats");
app.put("/classes");
app.put("/subclasses");
app.put("/abilities");
//--------
// Delete
// might not need.
//--------
app.delete("/project-access/:id");
app.delete("/projects/:id");
app.delete("/spells/:id");
app.delete("/feats/:id");
app.delete("/classes/:id");
app.delete("/subclasses/:id");
app.delete("/abilities/:id");
//--------------

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
