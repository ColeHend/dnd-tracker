import React from 'react'
import "./SpellsTable.scss"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { UserContext } from '../../../App'
import { TableCell } from '@mui/material'
import GenerateRow from '../../../utilities/generateTable/generateRow'
import GenerateTable from '../../../utilities/generateTable/generateTable'
import { removeObjectInArray } from '../../../utilities/utilities'
import IconButton from '@mui/material/IconButton/IconButton'
import Menu from '@mui/material/Menu/Menu'
import MenuItem from '@mui/material/MenuItem/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SpellCreation from './SpellCreation/SpellCreation'
import SpellDeletion from './SpellDeletion/SpellDeletion'

function SpellsTable({spells, projectID}) {
  const MySwal = withReactContent(Swal)
  const [heightmenuOptions] = React.useState([
    {name:'Edit A Spell',id:'edit'},
    {name:'Delete A Spell',id:'delete'}
  ]);
  const ITEM_HEIGHT = 35;
  const {apiService, userInfo} = React.useContext(UserContext)
  const {get:spellData, set:setSpellData} = spells;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event,spell) => {
    setSelectedRow(spell)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    checkOptionClick(option);
    setAnchorEl(null)
  };
  const checkOptionClick = (option)=>{
    switch (option.id) {
      case 'edit':
        console.log('clicked');
        break
      case 'delete':
        deleteSpellConfermation(selectedRow.spell_id);
        break
      default:
        break;
    }
  }
  const deleteSpellConfermation = async (spell_ID) => {
    MySwal.fire({
      title:<p>deleting spells</p>,
      footer:"copyright",
      showConfirmButton: false,
      showCancelButton: true,
      html:(
        <SpellDeletion 
          spell_ID={spell_ID}
          spellData={spellData}
          setSpellData={setSpellData}
          apiService={apiService}
          removeObjectInArray={removeObjectInArray}
        />
      )
    })
  }
  const config = {
    tableContainerID:"masterSpellsTableContainer",
    tableID:"masterSpellsTable",
    header:"MasterSpellsList",
    tableContainerSx: {
      minWidth: "50%",
      maxWidth: "50%",
      marginLeft: "20%",
      marginTop: "5%",
      fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    }
  }
  const titleNames = ['',"Spell Name",'', 'Options']
  const CollapsibleComponent = (spell, index) => (
    <div style={{width:'100%', wordWrap:'normal', font:'inherit',fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>
    <h1>{spell.spell_subhead}</h1>
    <br />
    <p>{spell.spell_desc}</p>
  </div>
  )

  return (
    <div id='spellsTableDiv'>
        <h1>Master Spells</h1>
        <hr />

        <GenerateTable isCollapsibleComponent={true} config={config} headerNames={titleNames}>
          {spellData.map((spell, index)=>(
            <GenerateRow CollapseComponent={()=>CollapsibleComponent(spell,index)} headerNames={titleNames}>
              <TableCell>{spell.spell_title}</TableCell>
              <TableCell>{spell.meta}</TableCell>
              <TableCell>
                <IconButton
                  aria-label='more1'
                  id='spell-long-button'
                  aria-controls={open?'spell-long-menu': undefined}
                  aria-expanded={open?'true':undefined}
                  aria-haspopup='true'
                  onClick={(e)=>handleClick(e,spell)}
               >
                <MoreVertIcon/>
                </IconButton>
                <Menu
                  id='spell-long-menu'
                  MenuListProps={{
                    'aria-labelledby': 'spell-long-button',
                  }}
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
                  {heightmenuOptions.map((option) =>(
                    <MenuItem key={option.id} onClick={()=>handleClose(option)}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Menu>
              </TableCell>
          </GenerateRow>
          ))}
        </GenerateTable>
        <div id="spellCreationDiv">
            <SpellCreation 
              projectID={projectID}
              userID={userInfo.user_id}
              apiService={apiService}
            />
        </div>
    </div>
  )
}

export default SpellsTable