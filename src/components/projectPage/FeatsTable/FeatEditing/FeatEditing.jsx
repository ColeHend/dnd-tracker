import React,{useState} from 'react'
import ApiService from '../../../../utilities/apiService';
import { Button } from '@mui/material';
import { UserContext } from '../../../../App';

function FeatEditing({feat_ID, apiService}) {
    

    const [updatedFeatName, setUpdatedFeatName] = useState('');
    const [updatedFeatDesc, setUpdatedFeatDesc] = useState('');
    const [updatedFeatSubheader, setUpdatedFeatSubheader] = useState('');
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
        console.log('worked');
    }





    return (
    <div>
        <h1>Update the Feat</h1>
        
        <p>First the new name?</p>
        <input type='text' value={updatedFeatName} onChange={handleNameInput}></input>
        <hr />
        <p>Then a New Desc?</p>
        <textarea value={updatedFeatDesc} onChange={handleDescInput}></textarea>
        <hr />
        <p>Lastly a new SubHeader?</p>
        <input type='text' value={updatedFeatSubheader} onChange={handleSubheaderInput}></input>
        <br />
        <br />
        <Button color='primary' variant='contained' onClick={updateFeat}>Submit</Button>
    </div>
  )
}

export default FeatEditing