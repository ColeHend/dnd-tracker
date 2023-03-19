// @ts-nocheck
import { Spell } from "../models/Spell";
export default class ApiService {
  private SERVER_URL: string = process.env.SERVER_URL || `http://localhost:4000`;

  constructor(axios: any, private URL?: string) {
    this.axios = axios;
    this.SERVER_URL = this.URL ? this.URL : process.env.SERVER_URL || `http://localhost:4000`;
  }

  async getProjectAccess(project_id: number) {
    if (project_id > 0) {
      let reqData = await this.axios.get(
        `${this.SERVER_URL}/api/projectAccess/${project_id}`
      );
      return reqData.data;
    }
  }
  async getSpells(user_id: number): Spell {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `${this.SERVER_URL}/api/spells/${user_id}`
      );
      return reqData.data;
    }
  }
  async getFeats(user_id: number) {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `${this.SERVER_URL}/api/feats/${user_id}`
      );
      return reqData.data;
    }
  }
  async getClasses(user_id: number) {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `${this.SERVER_URL}/api/classes/${user_id}`
      );
      return reqData.data;
    }
  }
  async getSubclasses(user_id: number) {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `${this.SERVER_URL}/api/subclasses/${user_id}`
      );
      return reqData.data;
    }
  }
  async getProjects(user_id: number) {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `${this.SERVER_URL}/api/projects/${user_id}`
      );
      return reqData.data;
    }
  }
  async getAbilities(user_id: number) {
    if (user_id > 0) {
      let reqData = await this.axios.get(
        `${this.SERVER_URL}/api/abilities/${user_id}`
      );
      return reqData.data;
    }
  }
  async createAbility(project_id: number, user_id:number, level:number, name:string, subhead:string, desc:string) {
    if (user_id > 0) {
      let resData = await this.axios.post(
        `${this.SERVER_URL}/api/abilities`,
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
      console.log(`Owner 0`);
    }
  }
  async createClass(
    project_id: number,
    user_id: number,
    name: string,
    hd: string,
    armor: string[],
    weap: string[],
    tools: string[],
    skills: string[],
    abilities: number[]
  ) {
    if (user_id > 0) {
      let resData = await this.axios.post(`${this.SERVER_URL}/api/classes`, {
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
      console.log(`Owner 0`);
    }
  }
  async createProject(owner:number, group_access: number[], name:string, desc:string) {
    if (owner > 0) {
      this.axios
        .post(`${this.SERVER_URL}/api/projects`, {
          project_owner: owner,
          project_group_access: [...group_access],
          project_name: name,
          project_desc: desc,
        })
        .then((res) => res.data);
    }
  }
  async createProjectAccess(project_group_id:number, user_id:number) {
    if (user_id > 0) {
      this.axios
        .post(`${this.SERVER_URL}/api/projectAccess`, {
          project_group_id: project_group_id,
          project_group_access: user_id,
        })
        .then((res) => res.data);
    }
  }
  async createSpell(project_id:number, owner:number, name:string, desc:string, subhead:string) {
    if (owner > 0) {
      let reqData = await this.axios.post(`${this.SERVER_URL}/api/spells`, {
        project_id: project_id,
        spell_owner: owner,
        spell_name: name,
        spell_desc: desc,
        spell_subhead: subhead,
      });
      return reqData.data;
    } else {
      console.log(`Owner 0`);
    }
  }
  async createFeat(project_id:number, owner:number, name:string, desc:string, subhead:string) {
    if (owner > 0) {
      let reqData = await this.axios.post(`${this.SERVER_URL}/api/feats`, {
        project_id: project_id,
        feat_owner: owner,
        feat_name: name,
        feat_desc: desc,
        feat_subhead: subhead,
      });
      return reqData.data;
    } else {
      console.log(`Owner 0`);
    }
  }
  async createSubclass(project_id:number, owner:number, subname:string, desc:string, className:string, abilities:number[]) {
    if (owner > 0) {
      let reqData = await this.axios.post(
        `${this.SERVER_URL}/api/subclasses`,
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
      console.log(`Owner 0`);
    }
  }
  async updateSpell(spell_id:number, spellName:string, spellSubhead:string, spellDesc:string) {
    if (spell_id > 0) {
      let reqData = await this.axios.put(`${this.SERVER_URL}/api/spell`, {
        spell_id: spell_id,
        spell_name: spellName,
        spell_desc: spellDesc,
        spell_subhead: spellSubhead,
      });
      return reqData.data;
    } else {
      console.log(`Owner 0`);
    }
  }
  async updateFeat(feat_id:number, featName:string, featDesc:string, featSubhead:string) {
    if (feat_id > 0) {
      let reqData = await this.axios.put(`${this.SERVER_URL}/api/feats`, {
        feat_id: feat_id,
        feat_name: featName,
        feat_desc: featDesc,
        feat_subhead: featSubhead,
      });
      return reqData.data;
    } else {
      console.log(`Owner 0`);
    }
  }
  async updateClass(
    class_id: number,
    class_name: string,
    class_hd: string,
    class_weap: string[],
    class_armor: string[],
    class_skills: string[],
    class_tools: string[]
  ) {
    if (class_id > 0) {
      let reqData = await this.axios.put(`${this.SERVER_URL}/api/classes`, {
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
    subclass_id: number,
    subclass_name: string,
    subclass_desc: string,
    subclass_class: string,
    subclass_abilities: number[]
  ) {
    let reqData = await this.axios.put(`${this.SERVER_URL}/api/subclasses`, {
      subclass_id: subclass_id,
      subclass_name: subclass_name,
      subclass_desc: subclass_desc,
      subclass_class: subclass_class,
      subclass_abilities: subclass_abilities,
    });
    return reqData.data;
  }
  async updateAbility(
    ability_id: number,
    ability_title: string,
    ability_subhead: string,
    ability_description: string
  ) {
    let reqData = await this.axios.put(`${this.SERVER_URL}/api/abilities`, {
      ability_id: ability_id,
      ability_title: ability_title,
      ability_subhead: ability_subhead,
      ability_description: ability_description,
    });
    return reqData.data;
  }
  async updateProject(
    project_id: number,
    project_name: string,
    project_desc: string,
    project_abilties:number[] = [],
    project_classes:number[] = [],
    project_feats:number[] = [],
    project_spells:number[] = [],
    project_subclasses:number[] = []
  ) {
    let reqData = await this.axios.put(`${this.SERVER_URL}/api/projects`, {
      project_id: project_id,
      project_name: project_name,
      project_desc: project_desc,
      project_abilties: project_abilties,
      project_classes: project_classes,
      project_subclasses: project_subclasses,
      project_feats: project_feats,
      project_spells: project_spells,
    });
    return reqData.data;
  }
  async addProjectAccess(project_group_id:number, project_group_access:number) {
    let reqData = await this.axios.put(
      `${this.SERVER_URL}/api/projectAccess/add`,
      {
        project_group_id: project_group_id,
        project_group_access: project_group_access,
      }
    );
    return reqData.data;
  }
  async removeProjectAccess(project_group_id:number, project_group_access:number) {
    let reqData = await this.axios.put(
      `${this.SERVER_URL}/api/projectAccess/remove`,
      {
        project_group_id: project_group_id,
        project_group_access: project_group_access,
      }
    );
    return reqData.data;
  }
  async deleteSpell(spell_id:number) {
    let reqData = await this.axios.post(`${this.SERVER_URL}/api/spells/delete`, {
      spell_id: spell_id,
    });
    return reqData.data;
  }
  async deleteFeat(feat_id:number) {
    let reqData = await this.axios.post(`${this.SERVER_URL}/api/feats/delete`, {
      feat_id: feat_id,
    });
    return reqData.data;
  }
  async deleteClass(class_id:number) {
    let reqData = await this.axios.post(`${this.SERVER_URL}/api/classes/delete`, {
      class_id: class_id,
    });
    return reqData.data;
  }
  async deleteSubclass(subclass_id:number) {
    let reqData = await this.axios.post(
      `${this.SERVER_URL}/api/subclasses/delete`,
      {
        subclass_id: subclass_id,
      }
    ); 
    return reqData.data;
  }
  async deleteAbility(ability_id:number) {
    let reqData = await this.axios.post(
      `${this.SERVER_URL}/api/abilities/delete`,
      {
        ability_id: ability_id,
      }
    );
    return reqData.data;
  }
  async deleteProject(project_id:number) {
    let reqData = {message:"Invalid"}
    if (project_id > 0) {
       reqData = await this.axios.post(
        `${this.SERVER_URL}/api/projects/delete`,
        {
          project_id: project_id,
        }
      );
    }
    return reqData.data;
  }
}
