import React, {useState} from 'react'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import IconButton from '@mui/material/IconButton/IconButton'
import Menu from '@mui/material/Menu/Menu'
import MenuItem from '@mui/material/MenuItem/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { grey,red } from '@mui/material/colors';
import SpellDeletion from '../SpellDeletion/SpellDeletion';
import { removeObjectInArray } from '../../../../utilities/utilities'; 

const theme = createTheme({
    palette: {
        primary: grey,
        secondary: red,
    },
});



function SpellTableLongmenu({selectedRow, spellData, setSpellData, apiService, MySwal,spellID}) {
    
   
    const deleteSpellConfermation = async (spell_ID) => {
        MySwal.fire({
          title: <p>deleting spells</p>,
          footer: "copyright",
          showConfirmButton: false,
          showCancelButton: true,
          html: (
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
    
    const [heightmenuOptions] = useState([
        { name: 'Edit A Spell', id: 'edit' },
        { name: 'Delete A Spell', id: 'delete' }
    ]);
  
    const handleClose = (option,PopupState) => {
        checkOptionClick(option);
        let close = ()=> PopupState.close
        close()
    };
    const checkOptionClick = (option) => {
        switch (option.id) {
            case 'edit':

                break
            case 'delete':
                deleteSpellConfermation(spellID);
                break
            default:
                break;
        }
    }

    return (
        <PopupState variant='popover' popupId='spell-popup-menu'>
            {
                (PopupState) => (
                    <>
                    <ThemeProvider theme={theme}>
                        <Button
                            
                            {...bindTrigger(PopupState)}
                        >
                            <MoreVertIcon />
                        </Button>
                    </ThemeProvider>
                        <Menu
                            
                            {...bindMenu(PopupState)}

                        >
                            {heightmenuOptions.map((option) => (
                                <MenuItem key={option.id} onClick={() => handleClose(option,PopupState)}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Menu>

                    </>
                )
            }
        </PopupState>
    )
}

export default SpellTableLongmenu