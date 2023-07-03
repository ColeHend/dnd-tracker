import React, { useContext } from "react";
import { Button } from "@mui/material";
import { UserContext } from "../../../App";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import { resetThepage } from "../../projectPage/SpellsTable/SpellCreation/SpellCreation";
import Axios from "axios";
import Spell from "../../projectPage/SpellsTable/spell.model";

function CreatePro(props) {
  const { userInfo, apiService } = useContext(UserContext);

  const initialValues = { projectName: "", projectDesc: "" };
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
  const onSubmit = (values, { resetForm }) => {
    apiService
      .createProject(
        userInfo.user_id,
        [userInfo.user_id],
        values.projectName,
        values.projectDesc
      )
      .then((values) => {
        resetForm();
        if (shouldAddSRD) {
          // ---- add SRD Spells ----
          Axios.get(process.env.SERVER_URL + "/api/srd/spells").then(
            (spellbook) => {
              spellbook.data.forEach((spell) => {
                const newSpell = new Spell(spell.name, spell.desc, {
                  level: `${spell.level}`,
                  school: spell.school,
                  casting_time: spell.casting_time,
                  range: spell.range,
                  components: spell.components,
                  duration: spell.duration,
                  concentration: spell.concentration,
                  ritual: spell.ritual,
                  material: spell.material,
                  attack_type: spell.attack_type,
                });
                apiService.createSpell(
                  userInfo.user_id,
                  values.project_id,
                  spell.spell_name,
                  newSpell.name,
                  newSpell.desc,
                  newSpell.metadata()
                );
              });
            }
          );
          // ---- add SRD Other stuff eventually ----
        }
      });
    resetThepage();
  };
  const formik = useFormik({ initialValues, onSubmit, validate });
  const [shouldAddSRD, setShouldAddSRD] = React.useState(false);
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
