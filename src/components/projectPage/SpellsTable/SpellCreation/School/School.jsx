import React from 'react'
import Divider from '@mui/material/Divider';

function School({formik,selectedSchool,setSelectedSchool,useSortArray}) {
    const spellSchools = [
        { name: "Divination", abr: 'div' },
        { name: "Evocation", abr: "evo" },
        { name: "Abjuration", abr: "abj" },
        { name: "Conjuration", abr: "con" },
        { name: "Enchantment", abr: "enc" },
        { name: "Illusion", abr: "ill" },
        { name: "Necromancy", abr: "necro" },
        { name: "Transmutaion", abr: "trans" }
    ];
    const [sortedSpellSchools] = useSortArray(spellSchools, (a, b) => a.name.localeCompare(b.name));
    const schoolChange = (e)=> {
        formik.values.school=e.target.value;
        setSelectedSchool(e.target.value);
    };


    return (
    <div key={crypto.randomUUID}>
        <p>Spell School</p>
        {
            sortedSpellSchools.map(school => <span key={crypto.randomUUID()}>
                    <input key={crypto.randomUUID()} onChange={schoolChange} checked={school.name === selectedSchool} value={school.name} type="radio" id={school.name + 'School'} />
                    <label key={crypto.randomUUID()} htmlFor={school.name + 'School'}>{school.name}</label>
                    <Divider sx={{border:'none'}} />
                  </span>)
        }
    </div>
  )
}

export default School