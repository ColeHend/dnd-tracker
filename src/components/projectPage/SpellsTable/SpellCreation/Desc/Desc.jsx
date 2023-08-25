import React from 'react'

function Desc({descValue,descOnChange}) {
  return (
    <div>
        <p>New Spell's Desc</p>
        <p>Markdown compatable</p>
        <textarea name="desc" placeholder='description...' id="SpellDesc" value={descValue} onChange={descOnChange} cols="30" rows="10" />
    </div>
  )
}

export default Desc