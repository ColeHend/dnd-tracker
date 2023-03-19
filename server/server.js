require("dotenv").config({ path: __dirname + "/../server/.env" });
const { Login, Register, Logout } = require("./controllers/loginControllers");
const create = require("./controllers/createController");
const get = require("./controllers/getController");
const update = require("./controllers/updateController");
const remove = require("./controllers/deleteController");
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
const PORT = process.env.PORT || 80;
const { SECRET } = process.env;
const oneDay = 1000 * 60 * 60 * 24;
const path = require("path");
const auth = require("./controllers/auth");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(express.static("../build")); //this is for production hosting

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

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });
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
app.post("/api/spells", create.spells);

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
app.post("/api/feats", create.feats);

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
app.post("/api/classes", create.classes);

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
app.post("/api/subclasses", create.subclasses);

// ----- abilities --------
// body object: {
//    project_id: project_id,
//    ability_owner: user_id
//    ability_level: Number
//    ability_name: (50 characters)
//    ability_subhead: (100 characters)
//    ability_description: description
// }
// returns: {
// }
app.post("/api/abilities", create.abilities);

//--------
// Read
//--------
// ----- project-access --------
// body object: N/A
// returns: {
//  project_group_id: project_id,
//  project_group_access: user_id
// }
app.get("/api/project-access/:projectid", get.projectAccess);
// ----- projects --------
// body object: N/A
// returns: {
//   project_id,
//   project_group_id,
//   project_name,
//   project_desc,
// }
app.get("/api/projects/:userid", get.project); // works
// ----- spells --------
// body object: N/A
// returns: {
//    project_id: project_id,
//    spell_owner: user_id
//    spell_title: (100 characters)
//    spell_subhead: (100 characters)
//    spell_desc: description
// }
app.get("/api/spells/:userid", get.spells);
// ----- feats --------
// body object: N/A
// returns: {
//    project_id: project_id,
//    feat_owner: user_id
//    feat_title: (100 characters)
//    feat_subhead: (100 characters)
//    feat_desc: description
// }
app.get("/api/feats/:userid", get.feats);
// ----- classes --------
// body object: N/A
// returns: {
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
app.get("/api/classes/:userid", get.classes);
// ----- subclasses ------
// body object: N/A
// returns: {
//    project_id: project_id,
//    subclass_owner: user_id
//    subclass_name: (50 characters)
//    subclass_desc: description
//    subclass_abilities_abl: [abiltity_id]
// }
app.get("/api/subclasses/:userid", get.subclasses);
// ----- abilities --------
// body object: N/A
// returns: {
//    project_id: project_id,
//    ability_owner: user_id
//    ability_name: (50 characters)
//    ability_subhead: (100 characters)
//    ability_description: description
// }
app.get("/api/abilities/:userid", get.abilities);
//--------
// Update
//--------
// ----- project-access --------
// body object: {
//  project_group_id: project_id,
//  project_group_access: user_id
// }
// returns: N/A

app.put("/api/project-access/add", update.addProjectAccess);
app.put("/api/project-access/delete", remove.removeProjectAccess);

// ----- projects --------
// body object: {
//   project_id,
//   project_group_id,
//   project_name,
//   project_desc,
// }
// returns: N/A

app.put("/api/projects", update.project);

// ----- spells --------
// body object: {
//    project_id: project_id,
//    spell_owner: user_id
//    spell_title: (100 characters)
//    spell_subhead: (100 characters)
//    spell_desc: description
// }
// returns: N/A
app.put("/api/spell", update.spell);
// ----- feats --------
// body object: {
//    project_id: project_id,
//    feat_owner: user_id
//    feat_title: (100 characters)
//    feat_subhead: (100 characters)
//    feat_desc: description
// }
// returns: N/A
app.put("/api/feats", update.feats);
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
// returns: N/A
app.put("/api/classes", update.classes);
// ----- subclasses ------
// body object: {
//    project_id: project_id,
//    subclass_owner: user_id
//    subclass_name: (50 characters)
//    subclass_desc: description
//    subclass_abilities_abl: [abiltity_id]
// }
// returns: N/A
app.put("/api/subclasses", update.subclasses);
// ----- abilities --------
// body object: {
//    project_id: project_id, 
//    ability_owner: user_id
//    ability_name: (50 characters)
//    ability_subhead: (100 characters)
//    ability_description: description
// }  ability_level: Number
// }
// returns: N/A
app.put("/api/abilities", update.abilities);
//--------
// Delete
// might not need.
//--------
// ----- project-access --------
app.post("/api/project-access/delete", remove.removeProjectAccess);
app.post("/api/projects/delete", remove.removeProject);
app.post("/api/spells/delete", remove.removeSpell);
app.post("/api/feats/delete", remove.removeFeat);
app.post("/api/classes/delete", remove.removeClass);
app.post("/api/subclasses/delete", remove.removeSubclass);
app.post("/api/abilities/delete", remove.removeAbility);
//--------------

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
