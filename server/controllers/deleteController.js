const { sequelize } = require("../sequel");

const removeProjectAccess = async (req, res) => {
  const { project_id, project_group_access } = req.body;
  let project = await sequelize.query(
    "SELECT * FROM projects WHERE project_id=?",
    {
      replacements: [project_id],
    }
  );
  let project_group_id = project[0][0].project_group_id;
  if (project_group_access.length > 0) {
    project_group_access.forEach(async (group_access) => {
      await sequelize.query(
        "DELETE FROM project_group_access WHERE project_group_id=? AND project_group_access=?",
        {
          replacements: [project_group_id, group_access],
        }
      );
    });
  }
  res.sendStatus(200);
};
const removeProject = async (req, res) => {
  console.log("------Deleting Project ----------");
  console.log("req_project_body: ", req);

  const { project_id } = req.body;
  if (project_id && project_id > 0) {
    let group_id = await sequelize.query(
      "SELECT * FROM project_group_access WHERE project_group_id=(SELECT project_group_id FROM project_group WHERE project_id=?)",
      {
        replacements: [project_id],
      });
    let project_group_id = group_id[0][0].project_group_id
    console.log("project_id: ", project_id);
    console.log("projectGroupID: ", project_group_id);
    console.log(group_id[0][0])
    await sequelize.query(
      "DELETE FROM project_group_access WHERE project_group_id=?",
      {
        replacements: [project_group_id],
      });
    await sequelize.query(
      "DELETE FROM project_group WHERE project_group_id=? RETURNING project_group_id",
      {
        replacements: [project_group_id],
      });
    await sequelize.query("DELETE FROM project_spells WHERE project_id=?", {
      replacements: [project_id],
    });
    await sequelize.query("DELETE FROM project_feats WHERE project_id=?", {
      replacements: [project_id],
    });
    await sequelize.query("DELETE FROM project_abilities WHERE project_id=?", {
      replacements: [project_id],
    });
    await sequelize.query("DELETE FROM project_classes WHERE project_id=?", {
      replacements: [project_id],
    });
    await sequelize.query("DELETE FROM project_subclasses WHERE project_id=?", {
      replacements: [project_id],
    });
    await sequelize.query("DELETE FROM projects WHERE project_id=?", {
      replacements: [project_id],
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(400)
  }
}
const removeClass = async (req, res) => {
  const { class_id } = req.body;
  await sequelize.query("DELETE FROM classes WHERE class_id=?", {
    replacements: [class_id],
  });
  res.sendStatus(200);
};
const removeSubclass = async (req, res) => {
  const { subclass_id } = req.body;
  await sequelize.query("DELETE FROM subclasses WHERE subclass_id=?", {
    replacements: [subclass_id],
  });
  res.sendStatus(200);
};
const removeAbility = async (req, res) => {
  const { ability_id } = req.body;
  await sequelize.query("DELETE FROM abilities WHERE ability_id=?", {
    replacements: [ability_id],
  });
  res.sendStatus(200);
};
const removeSpell = async (req, res) => {
  const { spell_id } = req.body;
  await sequelize.query("DELETE FROM spells WHERE spell_id=?", {
    replacements: [spell_id],
  });
  res.sendStatus(200);
};
const removeFeat = async (req, res) => {
  const { feat_id } = req.body;
  await sequelize.query("DELETE FROM feats WHERE feat_id=?", {
    replacements: [feat_id],
  });
  res.sendStatus(200);
};
module.exports = {
  removeProjectAccess,
  removeProject,
  removeClass,
  removeSubclass,
  removeAbility,
  removeSpell,
  removeFeat,
}
