import React from 'react'
import Divider from '@mui/material/Divider'


function Level({formik,selectedLevel,setSelectedLevel,sortedSpellLevels}) {
    const spellLevelChange = (e)=> {
        formik.values.level=e.target.value;
        setSelectedLevel(e.target.value);
    };
  
    return (
        <div>
            <p>Spell Level</p>
            {
                sortedSpellLevels.map(spellLevel =>
                    <span key={crypto.randomUUID()}>
                        <input key={crypto.randomUUID()} onChange={(e) => spellLevelChange(e)} checked={spellLevel.level === selectedLevel} value={spellLevel.level} type="radio" id={spellLevel.name + 'level'} />
                        <label key={crypto.randomUUID()} htmlFor={spellLevel.name + 'level'}>{spellLevel.name}</label>
                        <Divider sx={{ border: 'none' }} />
                    </span>)
            }
        </div>
    )
}


export default Level