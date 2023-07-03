import { Button } from '@mui/material'
import React from 'react'
import './SpellCreation.scss'
import Divider from '@mui/material/Divider'
import { objReturnString } from '../../../../utilities/utilities'
export function resetThepage() {
  window.location.reload(true)
}

class Spell {
  name;
  subhead;
  desc;
  school;
  level;
  constructor(name,subhead,desc,school,level){
    this.name = name;
    this.desc = desc;
    // --------v--------
    this.subhead = subhead;
    this.school = school;
    this.level = level;
  }
  metadata(){
    return objReturnString({
      subhead: this.subhead,
      level: this.level,
      school: this.school
    })
  }
}

const useSortArray = (data, compareFunc) => {
  const [sortedData, setSortedData] = React.useState([])
  const [isSorted, setIsSorted] = React.useState(false)
  const compareFunction = React.useCallback(compareFunc);

  React.useEffect(()=>{
    if (!isSorted) {
      setSortedData(data.slice().sort(compareFunction))
      setIsSorted(true)
    }
  }, [data, compareFunction,setSortedData])

  return [sortedData, setSortedData]
}

function SpellCreation({projectID, userID, apiService}) {
  const spellSchools = [
    {name:"Divination", abr:'div'}, 
    {name:"Evocation", abr:"evo"},
    {name:"Abjuration", abr:"abj"},
    {name:"Conjuration", abr:"con"},
    {name:"Enchantment", abr:"enc"},
    {name:"Illusion", abr:"ill"},
    {name:"Necromancy", abr:"necro"},
    {name:"Transmutaion", abr:"trans"}
  ]
  const spellLevels = [
    {level:"1", name:"First" },
    {level:"0", name:"Cantrip" },
    {level:"2", name:"Second"},
    {level:"3", name:"Third"},
    {level:"4", name:"Forth"},
    {level:"5", name:"Fifth"},
    {level:"6", name:"Sixth"},
    {level:"7", name:"Seventh"},
    {level:"8", name:"Eighth"},
    {level:"9", name:"ninth"}
    
  ]
  
  const [showSpellCreator, setShowSpellCreator] = React.useState(false)
  const [newspellName,setNewspellName] = React.useState('')
  const [newSpellDesc, setNewSpellDesc] = React.useState('')
  const [newSpellSubhead,setNewSpellSubhead] = React.useState(null)
  // const [newSpellSchools, setNewSpellSchools] = React.useState(spellSchools)
  const [selectedSchool, setSelectedSchool] = React.useState(null)
  const [selectedLevel, setSelectedLevel] = React.useState(null)
  const [sortedSpellSchools] = useSortArray(spellSchools,(a,b)=>a.name.localeCompare(b.name))
  const [sortedSpellLevels] = useSortArray(spellLevels,(a,b)=>+a.level - +b.level)

  const createTheSpell = (projectID,userID)=>{
    const createdSpell = new Spell(newspellName, newSpellSubhead,newSpellDesc,selectedSchool,selectedLevel) 
    apiService.createSpell(
      projectID,
      userID,
      createdSpell.name,
      createdSpell.desc,
      createdSpell.metadata(),
    )
    resetThepage()
  }



  return (
    <>
      <Button  color='info' onClick={()=>setShowSpellCreator(!showSpellCreator)}><h2>Create a Spell</h2></Button>

        <div id={showSpellCreator?'SpellCreationDiv':''}>
          
          {showSpellCreator? <div id='spellsContainer'>
          <div>
            <p>New Spell's Name</p>
            <input type='text' value={newspellName} onChange={(e)=>{ setNewspellName(e.target.value)}} />
            <hr />
            <p>New Spell's Desc</p>
            <textarea name="spellDesc" id="SpellDesc" value={newSpellDesc} onChange={(e)=>{setNewSpellDesc(e.target.value)}} cols="30" rows="10" />
            <hr />
            <p>New Spell's Subheader</p>
            <input type="text" value={newSpellSubhead} onChange={(e)=>{setNewSpellSubhead(e.target.value)}} />
            <br />

            <div>
              <p>Done?</p>
              <Button color='primary' variant='contained' onClick={()=>createTheSpell(projectID,userID)}>submit</Button>
            </div>  

          </div>
            
          <div id='spellTags'>
             <div style={{display:'flex',flexDirection:'row', flexWrap: 'wrap' }}>
              <span style={{flexBasis:'100%', height: 'min-content'}}>
                <hr />
                <p>Spell Tags</p>
                <hr />
              </span>
              <div>
              <p>Spell School</p>
                <br />
                {
                  sortedSpellSchools.map(school=><>
                    <input onChange={(e)=>{setSelectedSchool(e.target.value)}} checked={school.name === selectedSchool} value={school.name} type="radio" id={school.name+'School'} />
                    <label for={school.name+'School'}>{school.name}</label>
                    <Divider />
                  </>)
                }
              </div>
              <div id='spellLevelsTagdiv'>
                <p>Spell Level</p>
                {
                  sortedSpellLevels.map(level=><>
                    <input onChange={(e)=>{setSelectedLevel(e.target.value)}} checked={level.name === selectedLevel} value={level.name} type="radio" id={level.name+'level'} />
                    <label for={level.name+'level'}>{level.name}</label>
                    <Divider />

                  </>)
                }
              </div>
             </div>
          </div>

        </div>:null}

        
      </div>
    </>
  )
}

export default SpellCreation