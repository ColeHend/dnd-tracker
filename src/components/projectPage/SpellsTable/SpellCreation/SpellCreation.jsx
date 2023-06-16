import { Button } from '@mui/material'
import React from 'react'
import './SpellCreation.scss'

export function resetThepage() {
  window.location.reload(true)
}

function SpellCreation({projectID, userID, apiService}) {
  
  const [showSpellCreator, setShowSpellCreator] = React.useState(false)
  const [newspellName,setNewspellName] = React.useState('')
  const [newSpellDesc, setNewSpellDesc] = React.useState('')
  const [newSpellSubhead,setNewSpellSubhead] = React.useState('')
  const handleNameInput = (event)=>{
    setNewspellName(event.target.value)
  }
  const handleDescInput =(event)=>{
    setNewSpellDesc(event.target.value)
  }
  const handleSubheadInput = (event)=>{
    setNewSpellSubhead(event.target.value)
  }
  const createTheSpell = (projectID,userID)=>{
    apiService.createSpell(
      projectID,
      userID,
      newspellName,
      newSpellDesc,
      newSpellSubhead,
    )
    resetThepage()
  }
  return (
    <div id='SpellCreationDiv'>
      <Button color='info' onClick={()=>setShowSpellCreator(!showSpellCreator)}><h2>Create a Spell</h2></Button>
      {showSpellCreator? <div >
      <p>New Spell's Name</p>
      <input type='text' value={newspellName} onChange={handleNameInput}></input>
      <hr />
      <p>New Spell's Desc</p>
      <textarea name="spellDesc" id="SpellDesc" value={newSpellDesc} onChange={handleDescInput} cols="30" rows="10"></textarea>
      <hr />
      <p>New Spell's Subheader</p>
      <input type="text" value={newSpellSubhead} onChange={handleSubheadInput} />
      <br />
      <p>Done?</p>
      <Button color='primary' variant='contained' onClick={()=>createTheSpell(projectID,userID)}>submit</Button>
      </div>:null}
    </div>
  )
}

export default SpellCreation