import { Avatar, IconButton, Tooltip } from "@mui/material";

interface userAvatarProps {
    userAvatar: {
        shouldShow: boolean;
        link: string;
    };
    handleOpenUserMenu: any;
    sx?: any;
}

export default function UserAvatar(params:userAvatarProps) {
    const {userAvatar, handleOpenUserMenu} = params;
    return (
        <div>
            {userAvatar.shouldShow ? (
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={params.sx ?? { p: 0 }}>
                                    <Avatar
                                        // @ts-ignore
                                        alt={'User Avatar'}
                                        src={userAvatar.link}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : null}
        </div>
    )
};