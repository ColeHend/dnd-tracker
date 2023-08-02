import React, { lazy, Suspense, useState } from 'react'
import "./SpellsTable.scss"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { UserContext } from '../../../App'
import { Button, TableCell } from '@mui/material'
import GenerateRow from '../../../utilities/generateTable/generateRow'
import GenerateTable from '../../../utilities/generateTable/generateTable'

import SpellTableLongmenu from './SpellTableLong-menu/SpellTableLong-menu'
import SpellCreation from './SpellCreation/SpellCreation'

import { Divider } from '@mui/material'
import { stringReturnObj } from '../../../utilities/utilities'
import createTheSpell from './SpellCreation/SpellCreation'
import Spelloader from './Spelloader/Spelloader'
import Searchbar from '../../searchbar/searchbar'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const SpellCollapsible = lazy(() => import('./spellCollapsible/spellCollapsible.jsx'));

// import SpellCollapsible from './spellCollapsible/spellCollapsible.jsx'
function SpellsTable({ spells, projectID }) {
  const MySwal = withReactContent(Swal)
  
  
  const { apiService, userInfo } = React.useContext(UserContext)
  const { get: spellData, set: setSpellData } = spells;
  const [paginatedSpells, setPaginatedSpells] = useState(spellData ?? [])
  
  const [selectedRow, setSelectedRow] = useState(null);
  const [filteredSpells,setFilteredSpells] = useState(spellData ?? [])
 

  const returnLastCell = (spell)=>{
    const rows = Array.from(document.getElementById('masterSpellsTable').childNodes[1].childNodes)
    const i = paginatedSpells.map(sp=>sp.spell_title).indexOf(spell.spell_title);
    const row = Array.from(rows[i].childNodes);
    return row[(row.length - 1)]
  }


  
  const createASpellPopup = async () => {
    MySwal.fire({
      title: <p>Spell Creation</p>,
      footer: "copyright",
      showConfirmButton: false,
      showCancelButton: true,
      heightAuto: "false",
      width: '80%',
      padding: '5px',
      html: (
        <SpellCreation
          projectID={projectID}
          userID={userInfo.user_id}
          apiService={apiService}
          Myswal={MySwal}
        />
      )
    })
  }

  const config = {
    tableContainerID: "masterSpellsTableContainer",
    tableID: "masterSpellsTable",
    header: "MasterSpellsList",
    pagination: {
      itemData: filteredSpells,
      setItemData: setPaginatedSpells
    },
    tableContainerSx: {
      minWidth: "50%",
      maxWidth: "50%",
      marginLeft: "22.7%",
      marginTop: "2%",
      height: "100%",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",


    }
  }
  const titleNames = ['', "Spell Name", '', 'Options']
  let rowIndex;
  const spellMetaToObj = (spell)=>{
    return typeof stringReturnObj(spell.spell_subhead) === 'object' ? stringReturnObj({ ...spell, spell_subhead: stringReturnObj(spell.spell_subhead) }) : spell
  }
  const addAfter = (level)=>{
    switch (level) {
      case '0': 
        return 'Cantrip'
      case '1':
        return '1st'
      case '2':
        return '2nd'
      case '3':
        return '3rd'
      case +level > 3:
        return `${level}th` 
      default: 
         return `${level}th`

    }
  }
  return (
    <div id='spellsTableDiv'>
      <h1 style={{ textAlign: "center" }}>
        Master Spells
      </h1>
      <Divider className='spellTopDivide' sx={{ background: 'white' }} />
      <Button sx={{ marginLeft: "20vw", marginTop: "5vw", }} color='primary' variant='contained' onClick={createASpellPopup}> Create Spell</Button>
      <div id='spellTableBody'>
        <GenerateTable  isCollapsibleComponent={true} config={config} headerNames={titleNames}>
          <Searchbar data={spellData} searchkeys={['spell_title','spell_desc']} setFilteredData={setFilteredSpells}/>
          {
            paginatedSpells
              .map((spell, index) => spellMetaToObj(spell,index))
              .map((spell, index) => 
              (
              <Suspense key={spell.randID ?? crypto.randomUUID()} fallback={<Spelloader />}>
              <GenerateRow  CollapseComponent={() => <SpellCollapsible spell={spell} />} headerNames={titleNames}>
                
                    <TableCell>
                      {spell.spell_title}
                      <Stack direction={'row'} spacing={1}>
                        <Chip sx={{width:'min-width'}} label={`${spell.spell_subhead.school}`} />
                        {
                          spell.spell_subhead.ritual?<Chip sx={{width:'min-width'}} label={`ritual`} /> : null
                        }
                        {
                          spell.spell_subhead.concentration?<Chip sx={{width:'min-width'}} label={`concentration`} /> : null
                        }
                        
                        
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip sx={{width:'min-width'}} label={`${addAfter(spell.spell_subhead.level)}`}/>  
                    </TableCell>
                    <TableCell >
                      {/* <IconButton
                        aria-label='more1'
                        id='spell-long-button'
                        aria-controls={open ? 'spell-long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup='true'
                        onClick={handleClick(spell)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id='spell-long-menu'
                        MenuListProps={{'aria-labelledby': 'spell-long-button'}}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch'
                          },
                        }}
                      >
                        {heightmenuOptions.map((option) => (
                          <MenuItem key={option.id}  onClick={() => handleClose(option)}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Menu> */}
                      <SpellTableLongmenu spellID={spell.spell_id} spellData={spellData} setSpellData={setSpellData} apiService={apiService} MySwal={MySwal} setSelectedRow={setSelectedRow} />
                    </TableCell>
                  </GenerateRow>
                  </Suspense>
              ))}
        </GenerateTable>
      </div>
    </div>
  )
}

export default SpellsTable