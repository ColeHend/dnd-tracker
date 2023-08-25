import React from 'react'
import Divider from '@mui/material/Divider'

function Classes({formik,selectedClass,setSelectedClass}) {
    const handleClassSpellListChange = (e) =>(index)=> {
        formik.values.classes[index]=e.target.value
        
        setSelectedClass(...selectedClass,e.target.value)
    };
    return (
        <div>
            <p>classes</p>
            <br />
            {
                formik.values.classes.map((clas, i) => <span key={crypto.randomUUID()}>
                    <input type="checkbox" checked={formik.values.classes[i]} onChange={handleClassSpellListChange(i)} value={clas.class_name} id={clas.class_name + 'class'} />
                    <label htmlFor={clas.class_name + 'class'}>{clas.class_name}</label>
                    <Divider sx={{ border: 'none' }} />
                </span>)
            }
        </div>
    )
}

export default Classes