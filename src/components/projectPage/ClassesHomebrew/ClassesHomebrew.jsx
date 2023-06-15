import React from 'react'
import './ClassesHomebrew.scss'
import Box from "@mui/material/Box"
import { Link, Route, Routes } from 'react-router-dom';
import { Button } from '@mui/material';


function ClassesHomebrew(props) {

    
    const [showClasses,setShowClasses] = React.useState(false)
    const handleOpenclasses = () => {
      setShowClasses(!showClasses)
      console.log('worked');
    }


 
    
  return (
    <div id='classesHomebrewDiv'>
        
      <Box 
         sx={{ border:'black  solid 2px', width: '50vw', height:'3vw', marginLeft:'10vw', marginTop:'3vw', marginBottom:'1vw'}}
      >
          {props.classes.map((Class) =><Button 
          onClick={handleOpenclasses}
          sx={{color:'white'}}
          >{Class.class_name}</Button>  
          
          )}
            
      </Box>
      {console.log('data',props)}
      { showClasses? <div className='ClassesBox'>  
          
          </div>: null}
    </div>
  )
}

export default ClassesHomebrew