import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import IconChoice from "./navtools/barIcon";
import UserAvatar from "./navtools/row/avatarView";
import SettingsRow from "./navtools/row/settingRow";
import NavRow from "./navtools/row/navRow";
import NavLinkRow from "./navtools/row/navLinkRow";

const defaultPages: page[] = [{ page: "Home", toLink: "/" }, { page: "People", toLink: "/people" }, { page: "Spells", toLink: "/spell" }];
const defaultSettings: setting[] = [{ setting: "Home", toLink: "/" }];

interface page {
    page: string;
    toLink: string;
}
interface setting {
    setting: string;
    toLink: string;
}
interface props {
    pages?: page[];
    settings?: setting[];
    siteName?: string;
    userAvatar?: {
        shouldShow?: boolean;
        link?: string;
    }
    iconName?: "droid" | "castle";
    theme?: string;
}

export default function NavbarService(props: props) {
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [userAvatar, setuserAvatar] = React.useState({
        userAvatar: {
            shouldShow: props.userAvatar?.shouldShow !== undefined ? props.userAvatar.shouldShow : false,
            link: props.userAvatar?.link !== undefined ? props.userAvatar.link : "/static/images/avatar/2.jpg",
        }
    });
    const [siteName, setSiteName] = React.useState(props.siteName ?? "Default Site Name");
    const [settings, setSettings] = React.useState<setting[]>(props.settings ?? defaultSettings);
    const [pages, setPages] = React.useState<page[]>(props.pages ?? defaultPages);
    const [iconName, setIconName] = React.useState(props.iconName ?? "droid");
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // @ts-ignore

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconChoice iconName={iconName} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            {siteName}
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <NavRow pages={pages} handleOpenUserMenu={handleOpenUserMenu} handleCloseNavMenu={handleCloseNavMenu} anchorElNav={anchorElNav} />
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            {siteName}
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            <NavLinkRow pages={pages} />
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <UserAvatar userAvatar={userAvatar.userAvatar} handleOpenUserMenu={handleOpenUserMenu} />
                            <SettingsRow settings={settings} handleCloseUserMenu={handleCloseUserMenu} anchorElUser={anchorElUser} />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
    );
}