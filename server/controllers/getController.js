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
        if (project_id) {
          await sequelize
            .query("SELECT * FROM projects WHERE project_id=?", {
              replacements: [project_id],
            })
            .then((resp) => {
              projectsChecked++;
              projectsArr.push(resp[0][0]);
            })
            .catch((err) => {
              projectsChecked++;
              console.error(err);
            });
          if (totalProjects === projectsChecked) {
            console.log(projectsArr);
            res.status(200).send(projectsArr);
          }
        } else {
          projectsChecked++;
        }
      });
    }
  } else {
    res.sendStatus(500);
  }
};
const projectAccess = (req, res) => {
  let { projectid } = req.params;
  sequelize
    .query(
      "SELECT * FROM project_group_access WHERE project_group_id=(SELECT project_group_id FROM project_group WHERE project_id=?)",
      {
        replacements: [projectid],
      }
    )
    .then((resp) => {
      res.status(200).send(resp[0]);
    });
};
const spells = (req, res) => {
  sequelize
    .query("SELECT * FROM spells WHERE spell_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0]);
    });
};

const feats = (req, res) => {
  sequelize
    .query("SELECT * FROM feats WHERE feat_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0]);
    });
};
const classes = (req, res) => {
  sequelize
    .query("SELECT * FROM classes WHERE class_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0]);
    });
};
const subclasses = (req, res) => {
  sequelize
    .query("SELECT * FROM subclasses WHERE subclass_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0]);
    });
};
const abilities = (req, res) => {
  sequelize
    .query("SELECT * FROM abilities WHERE ability_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0]);
    });
};
module.exports = {
  projectAccess,
  project,
  spells,
  feats,
  classes,
  subclasses,
  abilities,
};
