import React from 'react'
import { Button } from '@mui/material';
import { resetThePage } from '../../../../utilities/utilities';

function DeleteAproject({projectID, apiService, allData, removeObjectInArray, setAllData,MySwal}) {
  const handleClose = ()=>{
    MySwal.close()
    resetThePage()
  }
  
  const deleteProject = async (project_id) =>{
    console.log('allData',allData);
    if (project_id > 0) {
        await apiService.deleteProject(project_id)
        setAllData(removeObjectInArray(allData,"project_id",project_id))
    }   
    handleClose()
}
 
  return (
    <div>
      <p>Are You Sure?</p>
      <Button color='primary' variant='contained' onClick={()=>deleteProject(projectID)}>Accept</Button>
    </div>
  )
}

export default DeleteAproject