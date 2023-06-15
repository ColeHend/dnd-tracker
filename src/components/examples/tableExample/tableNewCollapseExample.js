import React from 'react'

function CollapseExample({row, index}) {
  return (
    <div style={{ width: "90%", wordWrap: "normal" }}>
      <img id="monstIMG" src={row.img_url} alt={row.name} />
    </div>
  )
}

export default CollapseExample