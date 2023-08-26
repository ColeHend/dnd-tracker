import React from 'react'
import Divider from '@mui/material/Divider'

function Classes({formik,selectedClass,setSelectedClass}) {
    const handleClassSpellListChange = (index,e)=> {
        formik.values.classes[index]=e.target.value
        
        setSelectedClass(e.target.value)
        console.log('selectedClass',selectedClass);
    };
    return (
        <div>
            <p>classes</p>
            <br />
            {
                formik.values.classes.map((clas, i) => <span key={crypto.randomUUID()}>
                    <input type="checkbox" checked={selectedClass === formik.values.classes[i]} onChange={(event)=>handleClassSpellListChange(i,event)} value={clas[i]} id={clas.class_name + 'class'} />
                    <label htmlFor={clas.class_name + 'class'}>{clas.class_name}</label>
                    <Divider sx={{ border: 'none' }} />
                </span>)
            }
        </div>
    )
}

export default Classes