import React from 'react'
import { UserContext } from '../../../../App';
import { removeObjectInArray } from '../../../../utilities/utilities';
import { Button } from '@mui/material';

function DeleteConfermation({featData,setFeatData,feat_ID, apiService}) {
    
    //  
    const deletetheFeat = async (feat_ID) =>{
        console.log("feat_id: ", feat_ID);
        if (feat_ID > 0){
            await apiService.deleteFeat(feat_ID)
            console.log('Deleted');
            setFeatData(removeObjectInArray(featData, "feat_id", feat_ID))

        }
      }

    return (
    <div>
        <p>are you sure you want to delete it?</p>
        <Button color='primary' variant='contained' onClick={deletetheFeat(feat_ID)}>Yes</Button>
        
    </div>
  )
}

export default DeleteConfermation