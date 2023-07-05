import React, { useContext } from "react";
import { UserContext } from "../../../App";
import { useFormik } from "formik";
import { resetThepage } from "../../projectPage/SpellsTable/SpellCreation/SpellCreation";
import axios from "axios";
import Spell from "../../projectPage/SpellsTable/spell.model";
import { useParams } from "react-router-dom";
function CreatePro(props) {
  const { userInfo, apiService } = useContext(UserContext);
  const initialValues = { projectName: "", projectDesc: "" };
  const [shouldAddSRD, setShouldAddSRD] = React.useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.projectName) {
      errors.projectName = "Required!";
    }
    if (!userInfo.user_id) {
      errors.user_id = "not logged in!";
    }
    return errors;
  };
  const onSubmit = async (values, { resetForm }) => {
    const newSRDSpells = [];
    const serverURL = process.env.SERVER_URL || `http://localhost:4000`;
    const newProject = await apiService.createProject(userInfo.user_id, [userInfo.user_id], values.projectName, values.projectDesc);
    resetForm();
    console.log("newProject: ", +newProject.data.project_id, newProject);
    if (shouldAddSRD) {
      // ---- add SRD Spells ----
      const spellbook = await axios.get(serverURL + "/api/srd/spells");
      spellbook.data.forEach((spell) => {
        const newSpell = new Spell(
          spell.name,
          Array.isArray(spell.desc) ? spell.desc.join("\n") : spell.desc,
          {
            level: `${spell.level}`,
            school: spell.school.name,
            casting_time: spell.casting_time,
            range: spell.range,
            components: spell.components,
            duration: spell.duration,
            concentration: spell.concentration,
            ritual: spell.ritual,
            material: spell.material,
            attack_type: spell.attack_type,
            classes: spell.classes.map(x=>x.name),
          }
        );
        newSRDSpells.push(newSpell);
      });
      //--
      try {
        console.log("newSRDSpells: ", newSRDSpells);
        
        await apiService.massCreateSpell(
          +newProject.data.project_id,
          +userInfo.user_id,
          newSRDSpells.map((newSpell) => {
            return {
              spell_name: newSpell.name,
              spell_desc: newSpell.desc,
              spell_subhead: newSpell.metadata(),
            };
          })
        );
      } catch (err) { console.error("Error Creating Spell! ", err); }
      // ---- add SRD Other stuff eventually ----
    }
    // resetThepage();


  };
  const formik = useFormik({ initialValues, onSubmit, validate });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        validate={formik.validate}
      >
        <div className="projectForm">
          <div className="projectName">
            <label>
              Project Name:
              <input
                type="text"
                name="projectName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.projectName}
              />
            </label>
            {formik.errors.projectName && formik.touched.projectName}
          </div>
          <div className="projectDesc">
            <label>
              <textarea
                name="projectDesc"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.projectDesc}
                rows="5"
                cols="33"
              ></textarea>
            </label>
          </div>
          <div className="addSRD">
            <label>
              Add SRD Spell Content?
              <input
                type="checkbox"
                name="addSRD"
                onChange={(e) => setShouldAddSRD(!shouldAddSRD)}
                value={shouldAddSRD}
              />
            </label>
          </div>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default CreatePro;
