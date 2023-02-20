const { sequelize } = require("../sequel");
// sequelize.query('',{
//     replacements:[]
//   }).then((res)=>{
//   })
const projectAccess = (req, res) => {
  const { project_group_id, project_group_access } = req.body;
  sequelize
    .query(
      "INSERT INTO project_group_access(project_group_id,project_group_access) values(?,?)",
      {
        replacements: [project_group_id, project_group_access],
      }
    )
    .then((res) => {
      res.sendStatus(200);
    });
};
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
  let { spell_owner, spell_name, spell_subhead, spell_desc } = req.body;
  sequelize
    .query(
      "INSERT INTO spells(spell_owner,spell_title,spell_subhead,spell_desc) values(?,?,?,?) RETURNING *",
      {
        replacements: [spell_owner, spell_name, spell_subhead, spell_desc],
      }
    )
    .then((resp) => {
      res.status(200).send(resp[0][0]);
    });
};
const feats = (req, res) => {
  let { feat_owner, feat_title, feat_subhead, feat_desc } = req.body;
  sequelize
    .query(
      "INSERT INTO feats(feat_owner,feat_title,feat_subhead,feat_desc) values(?,?,?,?) RETURNING *",
      {
        replacements: [feat_owner, feat_title, feat_subhead, feat_desc],
      }
    )
    .then((res) => {
      res.status(200).send(res[0][0]);
    });
};
const classes = async (req, res) => {
  let {
    class_owner,
    class_name,
    class_hd,
    class_armor,
    class_weap,
    class_skills,
    class_tools,
    class_abilities_abl,
  } = req.body;
  const theClass = await sequelize.query(
    "INSERT INTO classes(class_owner,class_name,class_hd,class_armor,class_weap,class_skills,class_tools) values(?,?,?,?,?,?,?) RETURNING *",
    {
      replacements: [
        class_owner,
        class_name,
        class_hd,
        class_armor,
        class_weap,
        class_skills,
        class_tools,
      ],
    }
  );
  let theClassID = theClass[0][0].class_id;
  let classAblCount = 0;
  class_abilities_abl.forEach(async (ability) => {
    await sequelize
      .query(
        "INSERT INTO class_abilities(class_id,class_abilities_abl) values(?,?)",
        {
          replacements: [theClassID, ability],
        }
      )
      .then(() => {
        classAblCount++;
      });
  });
  if (classAblCount === class_abilities_abl.length) {
    sequelize
      .query("SELECT * FROM class_abilities WHERE class_id=?")
      .then((res) => {
        res
          .status(200)
          .send({ ...theClass[0][0], class_abilties: [...res[0][0]] });
      });
  }
};
const subclasses = (req, res) => {
  let {
    subclass_owner,
    subclass_name,
    subclass_parent,
    subclass_desc,
    subclass_abilities_abl,
  } = req.body;
  sequelize
    .query(
      "INSERT INTO subclasses(subclass_owner,subclass_name,subclass_parent,subclass_desc) values(?,?,?,?) RETURNING *",
      {
        replacements: [
          subclass_owner,
          subclass_name,
          subclass_parent,
          subclass_desc,
        ],
      }
    )
    .then((resp) => {
      //res.status(200).send(res[0][0]);
      let subClassAblCounter = 0;
      subclass_abilities_abl
        .forEach(async (ability) => {
          await sequelize.query(
            "INSERT INTO subclass_abilities(subclass_id,subclass_abilities_abl) values(?,?)",
            {
              replacements: [resp[0][0].subclass_id, ability],
            }
          );
        })
        .then(() => {
          subClassAblCounter++;
        });
      if (subClassAblCounter === subclass_abilities_abl.length) {
        sequelize
          .query("SELECT * FROM subclass_abilities WHERE subclass_id=?")
          .then((respo) => {
            res
              .status(200)
              .send({ ...resp[0][0], subclass_abilties: [...respo[0][0]] });
          });
      }
    });
};
const abilities = (req, res) => {
  let {
    ability_owner,
    ability_title,
    ability_subhead,
    ability_desc,
    ability_level,
  } = req.body;
  sequelize
    .query(
      "INSERT INTO abilities(ability_owner,ability_title,ability_subhead,ability_desc, ability_level) values(?,?,?,?,?) RETURNING *",
      {
        replacements: [
          ability_owner,
          ability_title,
          ability_subhead,
          ability_desc,
          ability_level,
        ],
      }
    )
    .then((res) => {
      res.status(200).send(res[0][0]);
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
