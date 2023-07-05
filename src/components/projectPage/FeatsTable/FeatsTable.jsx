import React from 'react'
import "./FeatsTable.scss"
import { UserContext } from '../../../App'
import TableCell from "@mui/material/TableCell";
import GenerateTable from '../../../utilities/generateTable/generateTable'
import GenerateRow from '../../../utilities/generateTable/generateRow'
import Pencil from '../../pencil/pencil';
import { removeObjectInArray } from "../../../utilities/utilities";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FeatCreation from './FeatCreation/FeatCreation';
import FeatEditing from './FeatEditing/FeatEditing';
import DeleteConfermation from './DeleteConfermation/DeleteConfermation';


function FeatsTable({feats, projectID}) {
  const MySwal = withReactContent(Swal)
  const [heightmenuOptions] = React.useState([

    {name:'Edit A Feat',id:'edit'},
    {name:'Delete A Feat',id:'delete'}
  ]);
  const ITEM_HEIGHT = 35;
  const {apiService, userInfo} = React.useContext(UserContext)
  const {get:featData, set:setFeatData} = feats;
  
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedRow, setSelectedRow] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event,row) => {
    setSelectedRow(row)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    checkOptionClick(option);
    setAnchorEl(null);
  };

  const checkOptionClick = (option)=>{
    switch (option.id) {
      case 'edit':
        
        updateFeat(selectedRow)
        break
      case 'delete':
        
        deleteCon(selectedRow.feat_id)
        break
      default:
        break;
    }
  }

  const deleteCon = async (feat_ID) => {
    MySwal.fire({
      title:<p>Delete Confermation</p>,
      footer:"Copyright",
      showConfirmButton: false,
      showCancelButton: true,
      html: (
        <DeleteConfermation
          feat_ID={feat_ID}
          featData={featData}
          setFeatData={setFeatData}
          apiService={apiService}
        />
      )
    })
  }
  
  const updateFeat = async (selectedRow) => {
    MySwal.fire({
      title:<p>Feat Editing</p>,
      footer:"Copyright",
      showConfirmButton: false,
      showCancelButton: true,
      html: (
        <FeatEditing 
          apiService={apiService}
          feat_ID={selectedRow.feat_id}
          selectedRow={selectedRow}
        />
      )
    })
    

  }
  

  
  const config = {
    tableContainerID: " featsTableContain",
    tableID: "featsTable",
    header: "Feats",
    tableContainerSx: {
      // minWidth: "50%",
      // maxWidth: "50%",
      marginLeft: "3%",
      marginTop: "5%",
      fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    }
  };
  const titleNames = ['Name', '', 'Options'];
  const CollapsibleComponent = (row, index) => (
    <div style={{ width: "100%", wordWrap: "normal",font:'inherit' ,fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}>
      <h1>{row.feat_subhead}</h1>
      <br></br>
      <textarea disabled={true} readOnly={true} style={{width:"60%", height:"15vw", border:"none",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>{row.feat_desc}</textarea>
    </div>
  )

  return (
    <div id='featsTablediv'>
      <h1 id='featsTableTitle'>Feats</h1>
      <hr />
      <div id='featsTableContainer'>
        <div id='featMasterTable'>
          <GenerateTable isCollapsible={true} config={config} headerNames={titleNames}>
            {featData.map((row, index)=> (
              <GenerateRow CollapseComponent={()=>CollapsibleComponent(row,index)} headerNames={titleNames}>
                <TableCell>{row.feat_title}</TableCell>
                <TableCell>{row.meta}</TableCell>
                <TableCell>
                 <IconButton
                  aria-label='more'
                  id='long-button'
                  aria-controls={open?'long-menu': undefined}
                  aria-expanded={open?'true':undefined}
                  aria-haspopup='true'
                  onClick={(e)=>handleClick(e,row)}
                 >
                  <MoreVertIcon/>
                 </IconButton>
                 <Menu
                  id='long-menu'
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
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

        </div>
        <div id='newCreatingFeats'>
            <FeatCreation 
              projectID={projectID}
              userID={userInfo.user_id}
              apiService={apiService}
            />
        </div>
      </div>
    </div>
  )
}

export default FeatsTable