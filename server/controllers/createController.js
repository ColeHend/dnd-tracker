const { sequelize } = require("../sequel");
// sequelize.query('',{
//     replacements:[]
//   }).then((res)=>{
//   })
const projectAccess = (req, res) => {};
const project = async (req, res) => {
  let {
    project_group_id,
    project_owner,
    project_group_access,
    project_name,
    project_desc,
  } = req.body;
  if (project_group_id) {
  } else {
    console.log(project_owner);
    let projGroup = await sequelize.query(
      "INSERT INTO project_group(project_owner) values(?) RETURNING project_group_id,project_owner",
      {
        replacements: [project_owner],
      }
    );
    project_group_id = projGroup[0][0].project_group_id;

    console.log(projGroup[0][0]);
    console.table(projGroup[0][0]);
  }
  project_group_access.forEach(async (group_access) => {
    await sequelize.query(
      "INSERT INTO project_group_access(project_group_id,project_group_access) values(?,?)",
      {
        replacements: [project_group_id, group_access],
      }
    );
  });
  console.log("project_group_id: ", project_group_id);
  let projectData = await sequelize.query(
    "INSERT INTO projects(project_name,project_desc) values(?,?) RETURNING project_id, project_name,project_desc",
    {
      replacements: [project_name, project_desc],
    }
  );
  await sequelize.query(
    "UPDATE project_group SET project_id=? WHERE project_group_id=?",
    {
      replacements: [projectData[0][0].project_id, project_group_id],
    }
  );
  console.log(projectData);
  res.status(200).send({ ...projectData[0][0], project_group_id });
};
const spells = (req, res) => {
  let { spell_owner, spell_title, spell_subhead, spell_desc } = req.body;
  sequelize
    .query(
      "INSERT INTO spells(spell_owner,spell_title,spell_subhead,spell_desc) values(?,?,?) RETURNING *",
      {
        replacements: [spell_owner, spell_title, spell_subhead, spell_desc],
      }
    )
    .then((res) => {
      res.status(200).send(res[0][0]);
    });
};
const feats = (req, res) => {};
const classes = (req, res) => {};
const subclasses = (req, res) => {};
const abilities = (req, res) => {};
module.exports = {
  projectAccess,
  project,
  spells,
  feats,
  classes,
  subclasses,
  abilities,
};
