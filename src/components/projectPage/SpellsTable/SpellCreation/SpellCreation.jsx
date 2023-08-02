import { Button } from '@mui/material'
import React from 'react'
import './SpellCreation.scss'
import Divider from '@mui/material/Divider'
import Spell from '../spell.model'
import { resetThePage } from '../../../../utilities/utilities'
import { useFormik } from "formik";

const useSortArray = (data, compareFunc) => {
  const [sortedData, setSortedData] = React.useState([])
  const [isSorted, setIsSorted] = React.useState(false)
  const compareFunction = React.useCallback(compareFunc);
  React.useEffect(() => {
    if (!isSorted) {
      setSortedData(data.slice().sort(compareFunction))
      setIsSorted(true)
    }
  }, [data, compareFunction, setSortedData, isSorted,setIsSorted])

  return [sortedData, setSortedData]
}

function SpellCreation({ projectID, userID, apiService,MySwal }) {
  const spellSchools = [
    { name: "Divination", abr: 'div' },
    { name: "Evocation", abr: "evo" },
    { name: "Abjuration", abr: "abj" },
    { name: "Conjuration", abr: "con" },
    { name: "Enchantment", abr: "enc" },
    { name: "Illusion", abr: "ill" },
    { name: "Necromancy", abr: "necro" },
    { name: "Transmutaion", abr: "trans" }
  ]

  const spellLevels = [
    { level: "1", name: "First" },
    { level: "0", name: "Cantrip" },
    { level: "2", name: "Second" },
    { level: "3", name: "Third" },
    { level: "4", name: "Forth" },
    { level: "5", name: "Fifth" },
    { level: "6", name: "Sixth" },
    { level: "7", name: "Seventh" },
    { level: "8", name: "Eighth" },
    { level: "9", name: "Ninth" }

  ]

  const [showSpellCreator, setShowSpellCreator] = React.useState(false)
  // const [newSpellSchools, setNewSpellSchools] = React.useState(spellSchools)
  const [selectedSchool, setSelectedSchool] = React.useState(null)
  const [selectedLevel, setSelectedLevel] = React.useState(null)
  const [sortedSpellSchools] = useSortArray(spellSchools, (a, b) => a.name.localeCompare(b.name))
  const [sortedSpellLevels] = useSortArray(spellLevels, (a, b) => +a.level - +b.level)

  const onSubmit = (values) => {
    const createdSpell = new Spell(values.name, values.desc, 
      {
        school: values.school, 
        level: sortedSpellLevels[+values.level].level
      } 
    )
   
    apiService.createSpell(
      projectID,
      userID,
      createdSpell.name,
      createdSpell.desc,
      createdSpell.metadata(),
     )
    resetThePage()
  }

  const formik = useFormik({
    initialValues: { name:'', desc:'', level:'',school:''},
    onSubmit
  })
  const schoolChange = (e)=> {
    formik.values.school=e.target.value;
    setSelectedSchool(e.target.value);
  };
  const spellLevelChange = (e)=> {
    formik.values.level=e.target.value;
    setSelectedLevel(e.target.value);
  };

  return (
    <form action='/api/spells' method='post' onSubmit={formik.handleSubmit}>
      <div id={'SpellCreationDiv'}>
        <div id='spellsContainer'>
          <div>
            <p>New Spell's Name</p>
            <input name='name' type='text' value={formik.values.name} onChange={formik.handleChange} />
            <hr />
            <p>New Spell's Desc</p>
            <textarea name="desc" id="SpellDesc" value={formik.values.desc} onChange={formik.handleChange} cols="30" rows="10" />
            <hr />
            {/* <p>New Spell's Subheader</p>
            <input type="text" value={newSpellSubhead} onChange={(e) => { setNewSpellSubhead(e.target.value) }} />
            <br /> */}
            <div>
              <p>Done?</p>
              <Button color='primary' type='submit' variant='contained'>Submit</Button>
            </div>
          </div>
          <div id='spellTags'>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              <span style={{ flexBasis: '100%', height: 'min-content' }}>
                <hr />
                <p>Spell Tags</p>
                <hr />
              </span>
              <div>
                <p>Spell School</p>
                <br />
                {
                  sortedSpellSchools.map(school => <>
                    <input key={crypto.randomUUID()} onChange={(e)=>schoolChange(e)} checked={school.name === selectedSchool} value={school.name} type="radio" id={school.name + 'School'} />
                    <label key={crypto.randomUUID()} htmlFor={school.name + 'School'}>{school.name}</label>
                    <Divider />
                  </>)
                }
              </div>
              <div id='spellLevelsTagdiv'>
                <p>Spell Level</p>
                {
                  sortedSpellLevels.map(spellLevel => 
                  <>
                    <input key={crypto.randomUUID()} onChange={(e)=>spellLevelChange(e)} checked={spellLevel.level === selectedLevel} value={spellLevel.level} type="radio" id={spellLevel.name + 'level'} />
                    <label key={crypto.randomUUID()} htmlFor={spellLevel.name + 'level'}>{spellLevel.name}</label>
                    <Divider />
                  </>)
                }
              </div>
            </div>
          </div>
        </div>
`      </div>
    </form>
  )
}

export default SpellCreation