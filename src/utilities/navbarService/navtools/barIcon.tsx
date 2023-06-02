import AdbIcon from "@mui/icons-material/Adb";
import CastleIcon from '@mui/icons-material/Castle';
interface iconChoiceProps {
    iconName: string;
}

export default function IconChoice(props: iconChoiceProps) {
    const { iconName } = props;
    const sxObj = { display: { xs: "none", md: "flex" }, mr: 1 };
    return (
        <>
           {
                iconName === "droid" ? <AdbIcon sx={sxObj} /> : null 
           }
           {
                iconName === "castle" ? <CastleIcon sx={sxObj} /> : null
           }
        </>
    )
}