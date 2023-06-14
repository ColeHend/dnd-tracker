import { Button } from '@mui/material';
import React from 'react'

function FeatCreation({projectID, userID, apiService}) {
  
    const [newFeatName , setNewFeatName] = React.useState('');
    const [newFeatDesc , setNewFeatDesc] = React.useState('');
    const [newFeatSubHeader, SetNewFeatSubheader] = React.useState('');
    const handleInputChangeNAME = (event) => {
        setNewFeatName(event.target.value)
    }
    const handleInputChangeDESC = (event) => {
        setNewFeatDesc(event.target.value)
    }
    const handleInputChangeSUBHEAD = (event) => {
        SetNewFeatSubheader(event.target.value)
    }
    
    const newFeat = ()=> {
        apiService.createFeat(
            projectID,
            userID,
            newFeatName,
            newFeatDesc,
            newFeatSubHeader
        )
    }
  
    return (
    <div>

        <h1>Feat Creation</h1>
        <br />
        <p>New Feat Name</p>
        <input type='text' value={newFeatName} onChange={handleInputChangeNAME}></input>
        <hr></hr>
        <p>New Feat Desc</p>
        <textarea value={newFeatDesc} onChange={handleInputChangeDESC}></textarea>
        <hr></hr>
        <p>New Feat Subheader</p>
        <input type='text' value={newFeatSubHeader} onChange={handleInputChangeSUBHEAD}></input>
        <hr />
        <p>done?</p>
        <button onClick={newFeat} >Submit</button>
    </div>
  )
}

export default FeatCreation