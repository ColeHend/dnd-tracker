import React, { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';

function Searchbar({data, searchkeys, setFilteredData}) {
  const [searchQuery,setSearchQuery] = useState('')
  
  
  // Function to handle search logic
  const handleSearch = (query) => {
      
    const filteredResults = data.filter((item) =>{
        if (!query || query.length < 1) {
          return true  
        } else {
            return searchkeys.map(searchkey=>{
                if (typeof item[searchkey ?? Object.keys(item)[0]] === 'string') {
                    return item[searchkey ?? Object.keys(item)[0]].toLowerCase().includes(query.toLowerCase())
                } else if(typeof item[searchkey ?? Object.keys(item)[0]] === 'number'){
                    return `${item[searchkey ?? Object.keys(item)[0]]}` === query
                }
            }).includes(true)

        }
    });
    setFilteredData(filteredResults);
  };

    return (
    <div style={{width:'100%'}}>
        <OutlinedInput
          sx={{
            background:'white',
            border:'2px solid black',
            width: '100%'
          }}
          type="text" 
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            handleSearch(e.target.value)
          }}
        />
    </div>
  )
}

export default Searchbar