import { Button } from '@mui/material'
import React from 'react'
import './SpellCreation.scss'
import Spell from '../spell.model'
import { resetThePage } from '../../../../utilities/utilities'
import { Field, useFormik } from "formik";
import Name from './Name/Name'
import Desc from './Desc/Desc'
import Range from './Range/Range'
import Concentration from './Concentration/Concentration'
import OtherCastingTime from './OtherCastingTime/OtherCastingTime'
import School from './School/School'
import Level from './Level/Level'
import CastingTIme from './CastingTIme/CastingTIme'
import MaterialComps from './MaterialComps/MaterialComps'
import MaterialCompInputBox from './MaterialCompInputBox/MaterialCompInputBox'
import Classes from './Classes/Classes'

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
  
  //----V--Can't move this stuff. I TRYED--V----
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
      ];
    const [sortedSpellLevels] = useSortArray(spellLevels, (a, b) => +a.level - +b.level)
    //----A--Can't move this stuff. I TRYED-----A----

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
  return (
    <form action='/api/spells' method='post' onSubmit={formik.handleSubmit}>
      <div id={'SpellCreationDiv'}>
        <div id='spellsContainer'>
          {/* left side of the creation popup */}
          <div>
            <Name nameValue={formik.values.name} nameOnChange={formik.handleChange}/>
            <hr />
            <Desc descValue={formik.values.desc} descOnChange={formik.handleChange}/>
            <hr />
            <Range rangeValue={formik.values.range} rangeOnChange={formik.handleChange} />
            <br />
            <Concentration ConChecked={formik.values.concentration} DurValue={formik.values.duration} ConValue={formik.values.concentration} formikChange={formik.handleChange}/>
            <OtherCastingTime formik={formik} castingTimeValue={otherCastingTime} CastingTISother={CastingTISother} setOtherCastingTime={setOtherCastingTime} />
            <MaterialCompInputBox 
              formik={formik}
              isMaterialComp={isMaterialComp}
              setOtherComponent={setOtherComponent}
              otherComponent={otherComponent}
            />
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
                <School formik={formik} selectedSchool={selectedSchool} setSelectedSchool={setSelectedSchool} useSortArray={useSortArray} />
              </div>
              <div id='spellLevelsTagdiv'>
                <Level formik={formik} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} sortedSpellLevels={sortedSpellLevels}  />
              </div>
              <div id='spellCastingTime'>
                <CastingTIme formik={formik} useSortArray={useSortArray} selectedCastingTime={selectedCastingTime} setSelectedCastingTime={setSelectedCastingTime} setCastingTISother={setCastingTISother} />
              </div>
              <div id='spellComponentsDiv'>
                <MaterialComps 
                  formik={formik}
                  setSelectedComponentM={setSelectedComponentM}
                  setSelectedComponentS={setSelectedComponentS}
                  setSelectedComponentV={setSelectedComponentV}
                  setIsMaterialComp={setIsMaterialComp}
                  selectedComponentM={selectedComponentM}
                  selectedComponentS={selectedComponentS}
                  selectedComponentV={selectedComponentV}
                />
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
                <Classes 
                  formik={formik}
                  selectedClass={selectedClass}
                  setSelectedClass={setSelectedClass}
                />
            </div>  
          </div>
        </div>
          <p className='spellCreSubmitBtn'>Done?</p>
          <Button className='spellCreSubmitBtn' color='primary' type='submit' variant='contained'>Submit</Button>
      </div>
    </form>
  )
}

export default SpellCreation