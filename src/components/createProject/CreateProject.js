import React, { useContext } from "react";
import { Button } from "@mui/material";
import { UserContext } from "../../App";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";

function CreatePro(props) {
   const {userInfo, apiService} = useContext(UserContext);
   
   const initialValues = {projectName:'', projectDesc: ''}
   const validate = (values)=> {
        const errors = {};
        if (!values.projectName) {
            errors.projectName = 'Required!';
        }
        if (!userInfo.user_id) {
            errors.user_id = 'not logged in!';
        }
        return errors
    }
    const onSubmit = (values,{resetForm}) => {
        apiService.createProject(
          userInfo.user_id,
          [userInfo.user_id],
          values.projectName,
          values.projectDesc
        ).then((values)=>{resetForm();console.log(values);});
      }
      const formik = useFormik({ initialValues, onSubmit, validate });
   return (
       
            <div>
                <form
                
                onSubmit={(e)=>{e.preventDefault();formik.handleSubmit(e)}}
                validate={formik.validate} 
                >
                        <label >
                            Project Name:
                        <input 
                            type='text' 
                            name='projectName'  
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.projectName}
                        />
                        </label>
                        {formik.errors.projectName && formik.touched.projectName}
                        <label>
                        <textarea
                            name="projectDesc"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.projectDesc}
                            rows="5"
                            cols="33"
                        >

                        </textarea>
                        </label>
                    <button  type="submit">
                        submit
                    </button>
                </form> 
            </div>
        
    )
}

export default CreatePro