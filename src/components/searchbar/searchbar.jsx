import React, { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';

function Searchbar({data, searchkeys, setFilteredData}) {
  const [searchQuery,setSearchQuery] = useState('')
  const [updateTable,setUpdateTable] = useState(false)
  const [updateDoneOnce,setUpdateDoneOnce] = useState(true)

  
  // Function to handle search logic
  const handleSearch = (query) => {
    
    const searchCheck = (item,searchkey, type) => typeof (item[searchkey ?? Object.keys(item)[0]]) === type
    const filteredResults = data.filter((item) =>{
        if (!query || query.length < 1) {
          return true  
        } else {
          if (Object.keys(item).includes('spell_title')) {
            item = {
              ...item,
              ...JSON.parse(item.spell_subhead)
            }
            delete item.spell_subhead
          }
            return searchkeys.map(searchkey=>{
              if (searchCheck(item, searchkey, 'boolean') && searchkey === query) {
                return item[searchkey ?? Object.keys(item)[0]]
              } else if (searchCheck(item, searchkey, 'string')) {
                  return item[searchkey ?? Object.keys(item)[0]].toLowerCase().includes(query.toLowerCase())
              } else if(searchCheck(item, searchkey, 'number')){
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