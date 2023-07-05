import React from 'react'
import { Button } from '@mui/material'
import { resetThePage } from '../../../../utilities/utilities'
import Swal from 'sweetalert2'

function SpellDeletion({spell_ID, spellData, setSpellData, apiService, removeObjectInArray}) {
  
  let runclose = false

  const deleteASPELL = async (spellID)=> {
    if (spellID > 0) {
        await apiService.deleteSpell(spellID)
        console.log(`Deleted:${spellID}`);
        setSpellData(removeObjectInArray(spellData,"spell ID",spellID))
        runclose = true
      }
      resetThePage()
  }
  
  
  
    return (
    <div>
      <p>Are You Sure?</p>
      <Button color='primary' variant='contained' onClick={()=>deleteASPELL(spell_ID)}>Accept</Button>

    </div>
  )
}

export default SpellDeletion