const { sequelize } = require("../sequel");
// sequelize.query('',{
//     replacements:[]
//   }).then((res)=>{
//   })
const project = async (req, res) => {
  req.session.reload((err) => {
    console.log("------------REQUEST------------");
    // console.log(req);
    // console.log(req.session);
    console.log("-------------------------------");
  })
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

const project_spells = async (req, res) => {
  sequelize.query("SELECT * FROM spells WHERE spell_id IN (SELECT project_spell_id FROM project_spells WHERE project_id = ?)", {
    replacements: [req.params.projectid],
  }).then(spellsInProject=>{
      res.status(200).send(spellsInProject[0])
  })
}
const feats = (req, res) => {
  sequelize
    .query("SELECT * FROM feats WHERE feat_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0]);
    });
};
const project_feats = async (req, res) => {
  sequelize.query("SELECT * FROM project_feats WHERE project_id=?", {
    replacements: [req.params.projectid],
  }).then(feats=>{
    const featsInProject = feats[0].map(feat=>feat.project_feats_id);
    sequelize
      .query("SELECT * FROM feats WHERE feat_owner=?", {
        replacements: [req.params.userid],
      })
      .then((resp) => {
        res.status(200).send(resp[0].filter(feat=>featsInProject.includes(feat.feat_id)))
      });
  }
  )
}
const classes = (req, res) => {
  sequelize
    .query("SELECT * FROM classes WHERE class_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0]);
    });
};
const project_classes = async (req, res) => {
  sequelize.query("SELECT * FROM project_classes WHERE project_id=?", { 
    replacements: [req.params.projectid],
  }).then(classesInProject=>{
    sequelize.query("SELECT * FROM classes WHERE class_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0].filter(aClass=>classesInProject.includes(aClass.project_class_id)))
    });
  })

}
const subclasses = (req, res) => {
  sequelize
    .query("SELECT * FROM subclasses WHERE subclass_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0]);
    });
};
const project_subclasses = async (req, res) => {
  sequelize.query("SELECT * FROM project_subclasses WHERE project_id=?", {
    replacements: [req.params.projectid],
  }).then(subclassesInProject=>{
    sequelize.query("SELECT * FROM subclasses WHERE subclass_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0].filter(subclass=>subclassesInProject.includes(subclass.project_subclass_id)))
    });
  })
}
const abilities = (req, res) => {
  sequelize
    .query("SELECT * FROM abilities WHERE ability_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0]);
    });
};
const project_abilities = async (req, res) => {
  sequelize.query("SELECT * FROM project_abilities WHERE project_id=?", {
    replacements: [req.params.projectid],
  }).then(abilitiesInProject=>{
    sequelize.query("SELECT * FROM abilities WHERE ability_owner=?", {
      replacements: [req.params.userid],
    })
    .then((resp) => {
      res.status(200).send(resp[0].filter(ability=>abilitiesInProject.includes(ability.project_ability_id)))
    });
  }
  )
}
module.exports = {
  projectAccess,
  project,
  project_spells,
  project_feats,
  project_classes,
  project_subclasses,
  project_abilities,
  spells,
  feats,
  classes,
  subclasses,
  abilities,
};
