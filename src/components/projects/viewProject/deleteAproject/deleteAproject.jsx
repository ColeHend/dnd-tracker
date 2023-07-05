import React from 'react'
import { Button } from '@mui/material';
import { resetThePage } from '../../../../utilities/utilities';

function DeleteAproject({projectID, apiService, allData, removeObjectInArray, setAllData}) {
  
  const deleteProject = async (project_id) =>{
        
    if (project_id > 0) {
        await apiService.deleteProject(project_id)
        console.log('deleted');
        setAllData(removeObjectInArray(allData,"project_id",project_id))
    }   
    resetThePage()
}

  return (
    <div>
      <p>Are You Sure?</p>
      <Button color='primary' variant='contained' onClick={()=>deleteProject(projectID)}>Accept</Button>
    </div>
  )
}

export default DeleteAproject