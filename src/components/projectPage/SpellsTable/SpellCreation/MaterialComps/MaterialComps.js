import React from 'react'
import Divider from '@mui/material/Divider'

function MaterialComps({formik,setSelectedComponentM,setSelectedComponentS,setSelectedComponentV,setIsMaterialComp,selectedComponentM,selectedComponentS,selectedComponentV}) {
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
  return (
    <div>
      <p>spell Components</p>
      <input key={crypto.randomUUID()} type="radio" value={"M"} name='componentM' checked={selectedComponentM === formik.values.componentM} onChange={(event) => spellComponentsChangeMaterial(event)} id='MComponent' />
      <label htmlFor="MComponent">M</label>
      <Divider sx={{ border: 'none' }} />
      <input key={crypto.randomUUID()} type="radio" value={"S"} name='componentS' checked={selectedComponentS === formik.values.componentS} onChange={(event) => spellComponentsChangeSomatic(event)} id='SComponent' />
      <label htmlFor="SComponent">S</label>
      <Divider sx={{ border: 'none' }} />
      <input key={crypto.randomUUID()} type="radio" value={"V"} name='componentV' checked={selectedComponentV === formik.values.componentV} onChange={(event) => spellComponentsChangeVerbal(event)} id='VComponent' />
      <label htmlFor="VComponent">V</label>
    </div>
  )
}

export default MaterialComps