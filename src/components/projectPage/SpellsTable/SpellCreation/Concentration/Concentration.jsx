import React from 'react'

function Concentration({ConChecked,DurValue,ConValue,formikChange}) {
  return (
    <div>
        <p>New Spell's Duration</p>
        <input type='checkbox' checked={ConChecked} value={ConValue} id='spellConcentration' name='concentration' onChange={formikChange}></input>
        <label htmlFor="spellConcentration">Concentration</label>
        <br />
        <input type="text" placeholder='duration...' name='duration' value={DurValue} onChange={formikChange} />
    </div>
  )
}

export default Concentration