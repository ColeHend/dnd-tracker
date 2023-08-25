import React from 'react'

function Name({nameValue, nameOnChange}) {
  return (
    <div>
        <p>New Spell's Name</p>
        <input name='name' placeholder='name...' type='text' value={nameValue} onChange={nameOnChange} />
    </div>
  )
}

export default Name