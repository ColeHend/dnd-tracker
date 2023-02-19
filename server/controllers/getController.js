const { sequelize } = require("../sequel");
// sequelize.query('',{
//     replacements:[]
//   }).then((res)=>{
//   })
const project = async (req, res) => {
  const user_id = +req.params.userid;
  if (user_id > 0) {
    let group_id = await sequelize.query(
      "SELECT * FROM project_group WHERE project_owner=?",
      {
        replacements: [user_id],
      }
    );
    const project_groups_id = group_id[0];
    const projectsArr = [];
    console.log("project_groups_id: ", project_groups_id);
    if (project_groups_id.length > 0) {
      let totalProjects = project_groups_id.length;
      let projectsChecked = 0;
      project_groups_id.forEach(async ({ project_id }) => {
        await sequelize
          .query("SELECT * FROM projects WHERE project_id=?", {
            replacements: [project_id],
          })
          .then((res) => {
            projectsChecked++;
            projectsArr.push(res[0][0]);
          });
        if (totalProjects === projectsChecked) {
          console.log(projectsArr);
          res.status(200).send(projectsArr);
        }
      });
    }
  } else {
    res.sendStatus(500);
  }
};
const projectAccess = (req, res) => {};
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
