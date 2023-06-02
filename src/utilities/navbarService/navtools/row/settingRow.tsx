import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import SettingsLinkButton from '../buttons/settingsLinkButton';

interface settingsRowProps {
    settings: {
        setting: string;
        toLink: string;
    }[],
    handleCloseUserMenu: any;
    anchorElUser: any;
}

export default function SettingsRow(props: settingsRowProps) {
    let { settings, handleCloseUserMenu, anchorElUser } = props;
    return (
        <Menu   
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                settings.map((setting, i) => (
                                    <MenuItem key={setting.setting} onClick={handleCloseUserMenu}>
                                        <SettingsLinkButton {...setting} />
                                    </MenuItem>
                                ))
                            }
                        </Menu>
    )
}