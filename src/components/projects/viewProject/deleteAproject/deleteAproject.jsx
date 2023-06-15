import React from 'react'

function DeleteAproject({projectID, apiService, allData, removeObjectInArray, setAllData}) {
  
  const deleteProject = async (project_id) =>{
        
    if (project_id > 0) {
        await apiService.deleteProject(project_id)
        console.log('deleted');
        setAllData(removeObjectInArray(allData,"project_id",project_id))
    }   
}

  return (
    <div>deleteAproject</div>
  )
}

export default DeleteAproject