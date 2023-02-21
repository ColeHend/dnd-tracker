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

module.exports = {
  removeProjectAccess,
};
