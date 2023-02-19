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
    let projGroup = await sequelize.query(
      "INSERT INTO project_group(project_owner) values(?) RETURNING project_group_id,project_owner",
      {
        replacements: [project_owner],
      }
    );
    console.table(projGroup);
    console.log(projGroup);
    project_group_id = projGroup[0][0];
  }
  project_group_access.forEach(async (group_access) => {
    await sequelize.query(
      "INSERT INTO project_group_access(project_group_id,project_group_access) values(?,?)",
      {
        replacements: [project_group_id, group_access],
      }
    );
  });

  let projectData = await sequelize.query(
    "INSERT INTO project(project_group_id,project_name,project_desc) values(?,?,?) RETURNING project_id, project_group_id,project_name,project_desc",
    {
      replacements: [project_group_id, project_name, project_desc],
    }
  );
  res.status(200).send({ projectData, project_group_id });
};
const spells = (req, res) => {};
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
