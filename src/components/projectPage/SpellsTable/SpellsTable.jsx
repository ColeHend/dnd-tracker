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

function SpellsTable({spells}) {
  console.log('spells: ',spells);
  const MySwal = withReactContent(Swal)
  const [heightmenuOptions] = React.useState([
    {name:'Edit A Spell',id:'edit'},
    {name:'Delete A Spell',id:'delete'}
  ]);
  const ITEM_HEIGHT = 35;
  const {apiService, userInfo} = React.useContext(UserContext)
  
  const {get:spellData, set:setSpellData} = spells;
  const [anchorEl, setAnchorEl] = React.useState(null)
  const {selectedSpell,setSelectedSpell } = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event,spell) => {

    setAnchorEl(event.currentTarget);
  }
  const handleClose = (option) => {
    checkOptionClick(option)
    setAnchorEl(null)
  }
  const checkOptionClick = (option)=>{
    switch (option.id) {
      case 'edit':
      
      break
    case 'delete':
      
      break
    default:
      break;
    }
  }
  const config = {
    tableContainerID:"masterSpellsTableContainer",
    tableID:"masterSpellsTable",
    header:"Master Spells List",
    tableContainerSx: {
      minWidth: "50%",
      maxWidth: "50%",
      marginLeft: "20%",
      marginTop: "5%"
    }
  }
  const titleNames = ["Spell Name", 'Options']
  const CollapsibleComponent = (spell, index) =>{
    <div style={{width:'100%', wordWrap:'normal'}}>
      <h1>{spell.spell_subhead}</h1>
      <br />
      <p>{spell.spell_desc}</p>
    </div>
  }



  return (
    <div id='spellsTableDiv'>
        {spellData > 0 ?<GenerateTable isCollapsibleComponent={true} config={config} headerNames={titleNames}>
          {spellData.map((spell, index)=>(
            <GenerateRow CollapsibleComponent={()=>CollapsibleComponent(spell,index)} headerNames={titleNames}>
              <TableCell>{spell.spell_title}</TableCell>
              <TableCell>{spell.meta}</TableCell>

            </GenerateRow>
          ))}
        </GenerateTable>:'no spells'}
        <div id="spellCreationDiv">
            <SpellCreation 
            
            />
        </div>
    </div>
  )
}

export default SpellsTable