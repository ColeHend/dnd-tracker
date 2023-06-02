import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface settingsLinkButtonProps {
    toLink: string;
    setting: string;
}

export default function SettingsLinkButton(props:settingsLinkButtonProps){
    let {setting, toLink} = props;
    return (
            <Link to={toLink} >
              <Typography>{setting}</Typography>
            </Link>
          )
}