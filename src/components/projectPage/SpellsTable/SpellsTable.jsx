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
import { Divider } from '@mui/material'
import { stringReturnObj } from '../../../utilities/utilities'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

function SpellsTable({spells, projectID}) {
  const MySwal = withReactContent(Swal)
  const [heightmenuOptions] = React.useState([
    {name:'Edit A Spell',id:'edit'},
    {name:'Delete A Spell',id:'delete'}
  ]);
  const ITEM_HEIGHT = 35;
  const {apiService, userInfo} = React.useContext(UserContext)
  const {get:spellData, set:setSpellData} = spells;
  const [paginatedSpells,setPaginatedSpells] = React.useState(spellData ?? [])
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
  console.log(spellData.length);
  const config = {
    tableContainerID:"masterSpellsTableContainer",
    tableID:"masterSpellsTable",
    header:"MasterSpellsList",
    pagination: {
      itemData: spellData,
      setItemData: setPaginatedSpells
    },
    tableContainerSx: {
      minWidth: "50%",
      maxWidth: "50%",
      marginLeft: "2%",
      marginTop: "5%",
      height:"100%",
      fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    }
  }
  const titleNames = ['',"Spell Name",'', 'Options']
  const CollapsibleComponent = (spell, index) => (
    <div style={{width:'100%',height:'max-content', wordWrap:'normal', font:'inherit',fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>
    <h1>
      {
        typeof spell.spell_subhead === 'object' ? 
        <>{spell.spell_subhead.subhead} {spell.spell_subhead.level} {spell.spell_subhead.school}</> //
        : spell.spell_subhead
      }
    </h1>
    <br />
    <div className='spellInfoWrapper'>
      {/* Level */}
      <div className='SpellInfo'>
        <label className='spellTag' for="spellLevel">
          Level:
        </label>
        <div id="spellLevel">
              {
                typeof spell.spell_subhead === 'object' ? 
                <>{spell.spell_subhead.level} </>
                : 'No level'
              }
        </div>
      </div>
      {/* School */}
      <div className='SpellInfo'>
         <label className='spellTag' for="spellSchool">
            School:
         </label>
         <div id="spellSchool">
            {
              typeof spell.spell_subhead === "object" ? 
              <>{spell.spell_subhead.school}</> 
              : 'no school'
            }
         </div>
      </div>
      {/* Casting Time */}
      <div className='SpellInfo'>
          <label className='spellTag' for="spellCasting_Time">
              Casting Time: 
          </label>
          <div id="spellCasting_Time">
              {
                typeof spell.spell_subhead === "object" ? 
                <>{spell.spell_subhead.casting_time}</> 
                : 'no Casting time'
              }
          </div>
      </div>
      {/* Range */}
      <div className='SpellInfo'>
          <label className='spellTag' for="spellRange">
             Range: 
          </label>
          <div id="spellRange">
             {
              typeof spell.spell_subhead === "object" ? 
              <> {spell.spell_subhead.range} </> 
              : "no Range"
             }
          </div>
      </div>
      {/* Components */}
      <div className='SpellInfo'>
            <label className='spellTag' for="spellComponents">
                Components:
            </label>
            <div id="spellComponents">
                {
                  typeof spell.spell_subhead === "object" ? 
                  spell.spell_subhead.components.join(", ")
                  : "no components"
                }
            </div>
      </div>
      {/* Material Components if any */}
      <div className='SpellInfo'>
        <label className='spellTag' for="spellMaterial">
          Material Components:
        </label>
        <div id="spellMaterial">
          {
            typeof spell.spell_subhead === "object" ? 
            <>{spell.spell_subhead.material}</>
            : "no material components"
          }
        </div>
      </div>
      {/* Duration */}
      <div className='SpellInfo'>
        <label className='spellTag' for="spellDuration">
          Duration:
        </label>
        <div id="spellDuration">
          {
            spell.spell_subhead.concentration ? 
            "Concentration "
            : ""
          }
          {
            typeof spell.spell_subhead === "object" ? 
            <>{spell.spell_subhead.duration}</>
            : "no Duration"
          }
        </div>
      </div>
      {/* Classes that can use the spell */}
      <div className='SpellInfo'>
        <label className='spellTag' for="spellClasses">
          Classes:
        </label>
        <div id="spellClasses">
          {
            typeof spell.spell_subhead === "object" ? 
            spell.spell_subhead.classes.join(", ") 
            : "no spell classes"
          }
        </div>
      </div>

    </div>
    <br />
    <br />
    {/* --v---Spell Desc----v---- */}
    <ReactMarkdown remarkPlugins={[gfm]}>{spell.spell_desc}</ReactMarkdown>
    </div>
  )

  return (
    <div id='spellsTableDiv'>
        <h1>Master Spells</h1>
        <Divider className='spellTopDivide' sx={{background:'white'}}/>

        <div id='spellTableBody'>
          <GenerateTable isCollapsibleComponent={true} config={config} headerNames={titleNames}>
            {
            paginatedSpells
            .map(spell=> typeof stringReturnObj(spell.spell_subhead) === 'object'? 
            stringReturnObj( {...spell,spell_subhead: stringReturnObj(spell.spell_subhead)}): spell )
            .map((spell, index)=>(
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
    </div>
  )
}

export default SpellsTable