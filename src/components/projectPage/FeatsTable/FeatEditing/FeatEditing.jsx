import React,{useState} from 'react'
import ApiService from '../../../../utilities/apiService';
import { Button } from '@mui/material';
import { UserContext } from '../../../../App';
import { resetThePage } from '../../../../utilities/utilities';

function FeatEditing({feat_ID, apiService,selectedRow}) {
    

    const [updatedFeatName, setUpdatedFeatName] = useState(selectedRow.feat_title);
    const [updatedFeatDesc, setUpdatedFeatDesc] = useState(selectedRow.feat_desc);
    const [updatedFeatSubheader, setUpdatedFeatSubheader] = useState(selectedRow.feat_subhead);
    const handleNameInput = (event) =>{
        setUpdatedFeatName(event.target.value)
    }
    const handleDescInput = (event) =>{
        setUpdatedFeatDesc(event.target.value)
    }
    const handleSubheaderInput = (event)=>{
        setUpdatedFeatSubheader(event.target.value)
    }
    const updateFeat = async ()=>{
        await apiService.updateFeat(
            feat_ID,
            updatedFeatName,
            updatedFeatDesc,
            updatedFeatSubheader

        )
        resetThePage()
        console.log('worked');
    }





    return (
    <div id='featEditingDiv'>
        <h1>Update the Feat</h1>
        
        <p>First the new name?</p>
        <input style={{font:"inherit"}} type='text' value={updatedFeatName} onChange={handleNameInput}></input>
        <hr />
        <p>Then a New Desc?</p>
        <textarea style={{width:"25vw", height:"17vw", font:"inherit"}} value={updatedFeatDesc} onChange={handleDescInput}></textarea>
        <hr />
        <p>Lastly a new SubHeader?</p>
        <input style={{font:"inherit"}} type='text' value={updatedFeatSubheader} onChange={handleSubheaderInput}></input>
        <br />
        <br />
        <Button color='primary' variant='contained' onClick={updateFeat}>Submit</Button>
    </div>
  )
}

export default FeatEditing