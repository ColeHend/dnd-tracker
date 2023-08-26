import React from 'react'
import Divider from '@mui/material/Divider'

function CastingTIme({formik,useSortArray,selectedCastingTime,setSelectedCastingTime,setCastingTISother}) {
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
    ];
    const [sortedSpellCastingTimes] = useSortArray(spellCastingTimes, (a, b)=> a.name.localeCompare(b.name))
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
    };
    return (
        <div>
            <p>spell Casting Time</p>
            {
                sortedSpellCastingTimes.map(spellCastingTime => <span key={crypto.randomUUID()}>
                    <input key={crypto.randomUUID()} onChange={(e) => spellCastingTimeChange(e, spellCastingTime)} checked={spellCastingTime.name === selectedCastingTime} value={spellCastingTime.name} type="radio" id={spellCastingTime.name + 'casting time'} />
                    <label key={crypto.randomUUID()} htmlFor={spellCastingTime.name + 'casting time'}>{spellCastingTime.name}</label>
                    <Divider sx={{ border: 'none' }} />
                </span>)
            }
        </div>
    )
}

export default CastingTIme