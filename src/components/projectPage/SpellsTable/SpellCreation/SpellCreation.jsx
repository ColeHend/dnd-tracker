import { Button } from '@mui/material'
import React from 'react'
import './SpellCreation.scss'
import Divider from '@mui/material/Divider'
import Spell from '../spell.model'
import { resetThePage } from '../../../../utilities/utilities'
import { Field, useFormik } from "formik";

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

function SpellCreation({ projectID, userID, apiService,MySwal,classes }) {
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
  const spellCastingTimes = [
    {name:'1 action', ID:'one_action'  },
    {name:'Bonus Action',ID:'bonus_action'},
    {name:'Reaction',ID:'reaction'},
    {name:'1 Minute',ID:'one_minute'},
    {name:'10 Minutes',ID:'ten_minutes'},
    {name:'1 hour',ID:'one_hour'},
    {name:'8 hours',ID:'eight_hours'},
    {name:'24 hours',ID:'one_day'},
    {name:'other',ID:'other'}
  ]
  const spellComponents = [
    {name:'somatic', sComponent:'S'},
    {name:'Verbal', sComponent:'V'},
    {name:'material', sComponent:'M'}
  ]
  // initital states
  const [selectedSchool, setSelectedSchool] = React.useState(null)
  const [selectedLevel, setSelectedLevel] = React.useState(null)
  const [selectedCastingTime,setSelectedCastingTime] = React.useState(null)
  const [selectedComponentM,setSelectedComponentM] = React.useState(null)
  const [selectedComponentS,setSelectedComponentS] = React.useState(null)
  const [selectedComponentV,setSelectedComponentV] = React.useState(null)
  const [CastingTISother,setCastingTISother] = React.useState(false)
  const [otherCastingTime, setOtherCastingTime] = React.useState('')
  const [isMaterialComp,setIsMaterialComp] = React.useState(false)
  const [otherComponent,setOtherComponent] = React.useState(null)
  const [selectedClass,setSelectedClass] = React.useState([])

  // sorting
  const [sortedSpellSchools] = useSortArray(spellSchools, (a, b) => a.name.localeCompare(b.name))
  const [sortedSpellLevels] = useSortArray(spellLevels, (a, b) => +a.level - +b.level)
  const [sortedSpellCastingTimes] = useSortArray(spellCastingTimes, (a, b)=> a.name.localeCompare(b.name))
 
  
  // other
  
  const onSubmit = (values) => {
    const createdSpell = new Spell(values.name, values.desc, 
      {
        school: values.school, 
        level: sortedSpellLevels[+values.level].level,
        casting_time: values.casting_time,
        range: values.range,
        components:[values.componentM,values.componentS,values.componentV],
        material:values.material,
        concentration: values.concentration,
        duration: values.duration,
        classes: values.classes
      } 
    )
    console.log('class', formik.values);
    console.log('values',values);
    apiService.createSpell(
       projectID,
       userID,
       createdSpell.name,
       createdSpell.desc,
       createdSpell.metadata(),
      )
    // resetThePage()
  }

  const formik = useFormik({
    initialValues: { name:'', desc:'', level:'',school:'',casting_time:'',range:'',componentM:'',componentS:'',componentV:'',material:'',concentration:false, duration:'',classes:[...classes]},
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
  
  const spellCastingTimeChange = (e, spellCastingTime)=> {
    checkCastingTimeClicked(spellCastingTime);
    formik.values.casting_time=e.target.value;
    setSelectedCastingTime(e.target.value);
  };
  const checkCastingTimeClicked = (spellCastingTime)=>{
    if (spellCastingTime.ID == 'other') {
      setCastingTISother(true)
    } else {
      setCastingTISother(false)
    }
  }
  const otherCastingtTimeChange = (e) =>{
    formik.values.casting_time=e.target.value
    setOtherCastingTime(e.target.value)
  }
  const spellComponentsChangeMaterial = (e)=>{
    checkMasterialComponents(e)
    formik.values.componentM=e.target.value
    setSelectedComponentM(e.target.value);
  }
  const spellComponentsChangeSomatic = (e)=>{
    formik.values.componentS=e.target.value
    setSelectedComponentS(e.target.value);
  }
  const spellComponentsChangeVerbal = (e)=>{
    
    formik.values.componentV=e.target.value
    setSelectedComponentV(e.target.value);
  }
  const checkMasterialComponents = (e) =>{
    if (e.target.value === 'M'){
      setIsMaterialComp(true)
    } else {
      setIsMaterialComp(false)
    }
  }
  const materialComponentChange = (e) => {
    formik.values.material=e.target.value
    setOtherComponent(e.target.value)
  }
  const handleClassSpellListChange = (e) =>(index)=> {
    formik.values.classes[index]=e.target.value
    
    setSelectedClass(...selectedClass,e.target.value)
  }
  return (
    <form action='/api/spells' method='post' onSubmit={formik.handleSubmit}>
      <div id={'SpellCreationDiv'}>
        <div id='spellsContainer'>
          {/* left side of the creation popup */}
          <div>
            <p>New Spell's Name</p>
            <input name='name' placeholder='name...' type='text' value={formik.values.name} onChange={formik.handleChange} />
            <hr />
            <p>New Spell's Desc</p>
            <p>Markdown compatable</p>
            <textarea name="desc" placeholder='description...' id="SpellDesc" value={formik.values.desc} onChange={formik.handleChange} cols="30" rows="10" />
            <hr />
            <p>New Spell's Range</p>
            <input type="text" name='range' placeholder='Range...' value={formik.values.range} onChange={formik.handleChange}/>
            <br />
            <p>New Spell's Duration</p>
            <input type='checkbox' checked={formik.values.concentration} value={formik.values.concentration} id='spellConcentration' name='concentration' onChange={formik.handleChange}></input>
            <label htmlFor="spellConcentration">Concentration</label>
            <br />
            <input type="text" placeholder='duration...' name='duration' value={formik.values.duration} onChange={formik.handleChange} />
            {
              CastingTISother?<>
                <p>type your own casting time</p>
                <input type="text" placeholder='other...' value={otherCastingTime}  onChange={(e)=>otherCastingtTimeChange(e)} />
              </>:null
            }
            {
              isMaterialComp?<>
                <p>type the material components</p>
                <input type="text" placeholder='material components...' value={otherComponent} onChange={(e)=>materialComponentChange(e)} />
              </>:null
            }
          </div>
          {/* right side of creation popup */}
          <div id='spellTags'>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              <span style={{  flexBasis: '100%', height: 'min-content', }}>
                <hr />
                <p>Spell Tags</p>
                <hr />
              </span>
              <div>
                <p>Spell School</p>
                <br />
                {
                  sortedSpellSchools.map(school => <>
                    <input key={crypto.randomUUID()} onChange={schoolChange} checked={school.name === selectedSchool} value={school.name} type="radio" id={school.name + 'School'} />
                    <label key={crypto.randomUUID()} htmlFor={school.name + 'School'}>{school.name}</label>
                    <Divider sx={{border:'none'}} />
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
                    <Divider sx={{border:'none'}}/>
                  </>)
                }
              </div>
              <div id='spellCastingTime'>
                <p>spell Casting Time</p>
                {
                  sortedSpellCastingTimes.map(spellCastingTime =><>
                  <input key={crypto.randomUUID()} onChange={(e)=>spellCastingTimeChange(e,spellCastingTime)} checked={spellCastingTime.name === selectedCastingTime} value={spellCastingTime.name} type="radio" id={spellCastingTime.name + 'casting time'}/>
                  <label key={crypto.randomUUID()} htmlFor={spellCastingTime.name + 'casting time'}>{spellCastingTime.name}</label>
                  <Divider sx={{border:'none'}}/>
                  </>)
                }
              </div>
              <div id='spellComponentsDiv'>
                <p>spell Components</p>
                {/* {
                  sortedSpellComponents.map(component =><>
                    <input key={crypto.randomUUID()} type="checkbox"  checked={checkedSpellComps}  value={component.sComponent} onChange={(e)=>spellComponentsChange(e, component)} id={component.sComponent + 'component'} />
                    <label key={crypto.randomUUID()} htmlFor={component.sComponent + 'component'}>{component.sComponent}</label>
                    <Divider sx={{border:'none'}}/>
                  </>)
                } */}
                <input key={crypto.randomUUID()} type="radio" value={"M"} name='componentM' checked={selectedComponentM === formik.values.componentM} onChange={(event)=>spellComponentsChangeMaterial(event)} id='MComponent'/>
                <label htmlFor="MComponent">M</label>
                <Divider sx={{border:'none'}}/>
                <input key={crypto.randomUUID()} type="radio" value={"S"} name='componentS' checked={selectedComponentS === formik.values.componentS} onChange={(event)=>spellComponentsChangeSomatic(event)} id='SComponent'/>
                <label htmlFor="SComponent">S</label>
                <Divider sx={{border:'none'}}/>
                <input key={crypto.randomUUID()} type="radio" value={"V"} name='componentV' checked={selectedComponentV === formik.values.componentV} onChange={(event)=>spellComponentsChangeVerbal(event)} id='VComponent'/>
                <label htmlFor="VComponent">V</label>
              </div>
            </div>
          </div>
          <div id="classSpellList's">
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
              <span style={{  flexBasis: '100%', height: 'min-content', }}>
                <hr />
                <p>class spell list's</p>
                <hr />
              </span>
              <div>
                <p>classes</p>
                <br />
                {
                  formik.values.classes.map((clas,i)=><>
                    <input type="checkbox" checked={formik.values.classes[i]} onChange={handleClassSpellListChange(i)} value={clas.class_name} id={clas.class_name + 'class'}/>
                    <label htmlFor={clas.class_name + 'class'}>{clas.class_name}</label>
                    <Divider sx={{border:'none'}}/>
                  </>)
                }
              </div>
            </div>
            
              
          </div>
        </div>
          <p className='spellCreSubmitBtn'>Done?</p>
          <Button className='spellCreSubmitBtn' color='primary' type='submit' variant='contained'>Submit</Button>
`      </div>
    </form>
  )
}

export default SpellCreation