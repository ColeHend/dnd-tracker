// @ts-nocheck
export class ApiService {
  constructor(axios) {
    this.axios = axios;
  }
  async getProjectAccess(project_id) {
    if (project_id > 0) {
      let reqData = await this.axios.get(
        `http://localhost:4000/api/projectAccess/${project_id}`
      );
      return reqData.data;
    }
  }
  async getSpells(user_id) {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `http://localhost:4000/api/spells/${user_id}`
      );
      return reqData.data;
    }
  }
  async getFeats(user_id) {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `http://localhost:4000/api/feats/${user_id}`
      );
      return reqData.data;
    }
  }
  async getClasses(user_id) {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `http://localhost:4000/api/classes/${user_id}`
      );
      return reqData.data;
    }
  }
  async getSubclasses(user_id) {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `http://localhost:4000/api/subclasses/${user_id}`
      );
      return reqData.data;
    }
  }
  async getProjects(user_id) {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `http://localhost:4000/api/projects/${user_id}`
      );
      return reqData.data;
    }
  }
  async getAbilities(user_id) {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `http://localhost:4000/api/abilities/${user_id}`
      );
      return reqData.data;
    }
  }
  async createAbilities(project_id, user_id, level, name, subhead, desc) {
    if (user_id > 0) {
      let resData = await this.axios.post(
        "http://localhost:4000/api/abilities",
        {
          project_id: project_id,
          ability_owner: user_id,
          ability_level: level,
          ability_title: name,
          ability_subhead: subhead,
          ability_desc: desc,
        }
      );
      return resData.data;
    } else {
      console.log("Owner 0");
    }
  }
  async createClass(
    project_id,
    user_id,
    name,
    hd,
    armor,
    weap,
    tools,
    skills,
    abilities
  ) {
    if (user_id > 0) {
      let resData = await this.axios.post("http://localhost:4000/api/classes", {
        project_id: project_id,
        class_owner: user_id,
        class_name: name,
        class_hd: hd,
        class_armor: [...armor],
        class_weap: [...weap],
        class_tools: [...tools],
        class_skills: [...skills],
        class_abilities_abl: [...abilities],
      });
      return resData.data;
    } else {
      console.log("Owner 0");
    }
  }
  async createProject(owner, group_access, name, desc) {
    if (owner > 0) {
      this.axios
        .post("http://localhost:4000/api/projects", {
          project_owner: owner,
          project_group_access: [...group_access],
          project_name: name,
          project_desc: desc,
        })
        .then((res) => res.data);
    }
  }
  async createProjectAccess(project_group_id, user_id) {
    if (user_id > 0) {
      this.axios
        .post("http://localhost:4000/api/projectAccess", {
          project_group_id: project_group_id,
          project_group_access: user_id,
        })
        .then((res) => res.data);
    }
  }
  async createSpell(project_id, owner, name, desc, subhead) {
    if (owner > 0) {
      let reqData = await this.axios.post("http://localhost:4000/api/spells", {
        project_id: project_id,
        spell_owner: owner,
        spell_name: name,
        spell_desc: desc,
        spell_subhead: subhead,
      });
      return reqData.data;
    } else {
      console.log("Owner 0");
    }
  }
  async createFeat(project_id, owner, name, desc, subhead) {
    if (owner > 0) {
      let reqData = await this.axios.post("http://localhost:4000/api/feats", {
        project_id: project_id,
        feat_owner: owner,
        feat_name: name,
        feat_desc: desc,
        feat_subhead: subhead,
      });
      return reqData.data;
    } else {
      console.log("Owner 0");
    }
  }
  async createSubclass(project_id, owner, subname, desc, className, abilities) {
    if (owner > 0) {
      let reqData = await this.axios.post(
        "http://localhost:4000/api/subclasses",
        {
          project_id: project_id,
          subclass_owner: owner,
          subclass_name: subname,
          subclass_desc: desc,
          subclass_class: className,
          subclass_abilities_abl: [...abilities],
        }
      );
      return reqData.data;
    } else {
      console.log("Owner 0");
    }
  }
  async updateSpell(spell_id, spellName, spellDesc, spellSubhead) {
    if (spell_id > 0) {
      let reqData = await this.axios.put(`http://localhost:4000/api/spells`, {
        spell_id: spell_id,
        spell_name: spellName,
        spell_desc: spellDesc,
        spell_subhead: spellSubhead,
      });
      return reqData.data;
    } else {
      console.log("Owner 0");
    }
  }
  async updateFeat(feat_id, featName, featDesc, featSubhead) {
    if (feat_id > 0) {
      let reqData = await this.axios.put(`http://localhost:4000/api/feats`, {
        feat_id: feat_id,
        feat_name: featName,
        feat_desc: featDesc,
        feat_subhead: featSubhead,
      });
      return reqData.data;
    } else {
      console.log("Owner 0");
    }
  }
  async updateClass(
    class_id,
    class_name,
    class_hd,
    class_skills,
    class_weap,
    class_armor,
    class_tools
  ) {
    if (class_id > 0) {
      let reqData = await this.axios.put(`http://localhost:4000/api/classes`, {
        class_id: class_id,
        class_name: class_name,
        class_hd: class_hd,
        class_skills: class_skills,
        class_weap: class_weap,
        class_armor: class_armor,
        class_tools: class_tools,
      });
      return reqData.data;
    }
  }
  async updateSubclass(
    subclass_id,
    subclass_name,
    subclass_desc,
    subclass_class,
    subclass_abilities
  ) {
    let reqData = await this.axios.put(`http://localhost:4000/api/subclasses`, {
      subclass_id: subclass_id,
      subclass_name: subclass_name,
      subclass_desc: subclass_desc,
      subclass_class: subclass_class,
      subclass_abilities: subclass_abilities,
    });
    return reqData.data;
  }
  async updateAbility(
    ability_id,
    ability_title,
    ability_subhead,
    ability_description
  ) {
    let reqData = await this.axios.put(`http://localhost:4000/api/abilities`, {
      ability_id: ability_id,
      ability_title: ability_title,
      ability_subhead: ability_subhead,
      ability_description: ability_description,
    });
    return reqData.data;
  }
  async updateProject(project_id, project_name, project_desc) {
    let reqData = await this.axios.put(`http://localhost:4000/api/projects`, {
      project_id: project_id,
      project_name: project_name,
      project_desc: project_desc,
    });
    return reqData.data;
  }
  async addProjectAccess(project_group_id, project_group_access) {
    let reqData = await this.axios.put(
      `http://localhost:4000/api/projectAccess/add`,
      {
        project_group_id: project_group_id,
        project_group_access: project_group_access,
      }
    );
    return reqData.data;
  }
  async removeProjectAccess(project_group_id, project_group_access) {
    let reqData = await this.axios.put(
      `http://localhost:4000/api/projectAccess/remove`,
      {
        project_group_id: project_group_id,
        project_group_access: project_group_access,
      }
    );
    return reqData.data;
  }
}
