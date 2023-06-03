import Typography from "@mui/material/Typography";

interface settingsButtonProps {
    setting: string;
}
export default function SettingsButton(props:settingsButtonProps){
    let {setting} = props;
    return (<Typography>{setting}</Typography>)
}