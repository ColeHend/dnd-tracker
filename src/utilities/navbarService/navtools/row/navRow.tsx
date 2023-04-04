import { Menu, MenuItem, Typography } from "@mui/material"

interface props {
    pages: {
        page: string;
    }[],
    handleOpenUserMenu: any;
    handleCloseNavMenu: any;
    anchorElNav: any;
}
export default function NavbarRow(props: props) {
    const { pages, handleOpenUserMenu, handleCloseNavMenu, anchorElNav } = props
    return (
        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                            >
                            {
                                pages.map((page, i) => (
                                    <MenuItem key={page.page} onClick={handleOpenUserMenu}>
                                        <Typography textAlign="center">{page.page}</Typography>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
    )
}