import React from 'react'

function MaterialCompInputBox({formik,isMaterialComp,setOtherComponent,otherComponent}) {
    const materialComponentChange = (e) => {
        formik.values.material=e.target.value
        setOtherComponent(e.target.value)
    };
    return (
        <div>
            {
                isMaterialComp ? <>
                    <p>type the material components</p>
                    <input key={crypto.randomUUID} type="text" placeholder='material components...' value={otherComponent} onChange={(e) => materialComponentChange(e)} />
                </> : null
            }
        </div>
    )
}

export default MaterialCompInputBox