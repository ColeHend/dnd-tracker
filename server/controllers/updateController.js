const { sequelize } = require("../sequel");

const arrayString = require("../../src/utilities/utilities").arrayString;
const project = async (req, res) => {
  let {
    project_id,
    project_name,
    project_desc,
    project_abilties,
    project_classes,
    project_feats,
    project_spells,
    project_subclasses,
  } = req.body;
  if (project_id) {
    let project = await sequelize.query(
      "UPDATE projects SET project_name=?,project_desc=? WHERE project_id=? RETURNING project_id, project_name,project_desc",
      {
        replacements: [project_name, project_desc, project_id],
      }
    );
    if (project_abilties.length > 0) {
      project_abilties.forEach(async (ability) => {
        await sequelize.query(
          "INSERT INTO project_abilities(project_id,ability_id) values(?,?)",
          {
            replacements: [project_id, ability],
          }
        );
      });
    }
    if (project_classes.length > 0) {
      project_classes.forEach(async (class_id) => {
        await sequelize.query(
          "INSERT INTO project_classes(project_id,class_id) values(?,?)",
          {
            replacements: [project_id, class_id],
          }
        );
      });
    }
    if (project_feats.length > 0) {
      project_feats.forEach(async (feat_id) => {
        await sequelize.query(
          "INSERT INTO project_feats(project_id,feat_id) values(?,?)",
          {
            replacements: [project_id, feat_id],
          }
        );
      });
    }
    if (project_spells.length > 0) {
      project_spells.forEach(async (spell_id) => {
        await sequelize.query(
          "INSERT INTO project_spells(project_id,spell_id) values(?,?)",
          {
            replacements: [project_id, spell_id],
          }
        );
      });
    }
    if (project_subclasses.length > 0) {
      project_subclasses.forEach(async (subclass_id) => {
        await sequelize.query(
          "INSERT INTO project_subclasses(project_id,subclass_id) values(?,?)",
          {
            replacements: [project_id, subclass_id],
          }
        );
      });
    }
    res.status(200).send(project[0][0]);
  }
};
const addProjectAccess = async (req, res) => {
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
        "INSERT INTO project_group_access(project_group_id,project_group_access) values(?,?)",
        {
          replacements: [project_group_id, group_access],
        }
      );
    });
  }
  res.sendStatus(200);
};

const feat = async (req, res) => {
  let { feat_id, feat_name, feat_desc, feat_subhead } = req.body;
  let featData = await sequelize.query(
    "UPDATE feats SET feat_name=?, feat_desc=?, feat_subhead=? WHERE feat_id=? RETURNING *",
    {
      replacements: [feat_name, feat_desc, feat_subhead, feat_id],
    }
  );
  res.status(200).send(featData[0][0]);
};
const classes = async (req, res) => {
  let {
    class_id,
    class_name,
    class_hd,
    class_skills,
    class_weap,
    class_armor,
    class_tools,
  } = req.body;
  let classData = await sequelize.query(
    `UPDATE classes SET class_name=?, class_hd=?, class_skills='{${arrayString(
      class_skills
    )}}', class_weap='{${arrayString(
      class_weap
    )}}', class_armor='{${arrayString(
      class_armor
    )}}', class_tools='{${arrayString(
      class_tools
    )}}' WHERE class_id=? RETURNING *`,
    {
      replacements: [class_name, class_hd, class_id],
    }
  );
  res.status(200).send(classData[0][0]);
};
const spell = async (req, res) => {
  let { spell_id, spell_name, spell_desc, spell_subhead } = req.body;
  let spellData = await sequelize.query(
    "UPDATE spells SET spell_title=?, spell_desc=?, spell_subhead=? WHERE spell_id=? RETURNING *",
    {
      replacements: [spell_name, spell_desc, spell_subhead, spell_id],
    }
  );
  res.status(200).send(spellData[0][0]);
};
const feats = async (req, res) => {
  let { feat_id, feat_name, feat_desc, feat_subhead } = req.body;
  let featData = await sequelize.query(
    "UPDATE feats SET feat_title=?, feat_desc=?, feat_subhead=? WHERE feat_id=? RETURNING *",
    {
      replacements: [feat_name, feat_desc, feat_subhead, feat_id],
    }
  );
  res.status(200).send(featData[0][0]);
};
const abilities = async (req, res) => {
  let { ability_id, ability_title, ability_description, ability_subhead } =
    req.body;
  let abilityData = await sequelize.query(
    "UPDATE abilities SET ability_name=?, ability_description=?, ability_subhead=? WHERE ability_id=? RETURNING *",
    {
      replacements: [
        ability_title,
        ability_description,
        ability_subhead,
        ability_id,
      ],
    }
  );
  res.status(200).send(abilityData[0][0]);
};
const subclasses = async (req, res) => {
  let {
    subclass_id,
    subclass_name,
    subclass_desc,
    subclass_class,
    subclass_abilities,
  } = req.body;
  let subclassData = await sequelize.query(
    "UPDATE subclasses SET subclass_name=?, subclass_desc=?, subclass_class=? WHERE subclass_id=? RETURNING *",
    {
      replacements: [subclass_name, subclass_desc, subclass_class, subclass_id],
    }
  );
  if (subclass_abilities.length > 0) {
    let abilities = [];
    subclass_abilities.forEach(async (ability) => {
      let abilityData = await sequelize.query(
        "UPDATE abilities SET ability_name=?,ability_subhead=?,ability_description=?, ability_subclass=? WHERE ability_id=? RETURNING *",
        {
          replacements: [
            ability.ability_name,
            ability.ability_subhead,
            ability.ability_description,
            subclass_id,
            ability.ability_id,
          ],
        }
      );
      abilities.push(abilityData[0][0]);
    });
    res.status(200).send({ ...subclassData[0][0], ...abilities });
  } else {
    res.status(200).send(subclassData[0][0]);
  }
};

module.exports = {
  spell,
  feats,
  abilities,
  subclasses,
  feat,
  classes,
  addProjectAccess,
  project,
};
