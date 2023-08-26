import React from 'react'

function OtherCastingTime({formik,castingTimeValue,CastingTISother,setOtherCastingTime}) {
    const otherCastingtTimeChange = (e) =>{
        formik.values.casting_time=e.target.value
        setOtherCastingTime(e.target.value)
      }
  
    return (
    <div>
        {
            CastingTISother?<>
            <p>type your own casting time</p>
            <input type="text" placeholder='other...' value={castingTimeValue}  onChange={(e)=>otherCastingtTimeChange(e)} />
            </>:null
        }
    </div>
  )
}

export default OtherCastingTime