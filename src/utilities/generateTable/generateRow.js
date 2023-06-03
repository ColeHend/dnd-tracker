import React from 'react'
import CustomRow from './customRow'
function GenerateRow(props) {
    const {CollapseComponent, cellStyle, headerNames} = props;
  return (
    <>{
            (<CustomRow 
            cellStyle={cellStyle ?? {}} 
            CollapseComponent={CollapseComponent ?? null} 
            colSpan={CollapseComponent ? (headerNames.length + 1) : headerNames.length}>{props.children}</CustomRow>)
    }</>
  )
}

export default GenerateRow