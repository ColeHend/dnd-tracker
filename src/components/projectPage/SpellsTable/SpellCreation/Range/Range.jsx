import React from 'react'

function Range({rangeValue,rangeOnChange}) {
  return (
    <div>
        <p>New Spell's Range</p>
        <input type="text" name='range' placeholder='Range...' value={rangeValue} onChange={rangeOnChange}/>
    </div>
  )
}

export default Range