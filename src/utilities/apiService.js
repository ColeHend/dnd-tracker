// @ts-nocheck
export class ApiService {
  constructor(axios) {
    this.axios = axios;
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
}
