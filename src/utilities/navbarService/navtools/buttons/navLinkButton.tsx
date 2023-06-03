import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

interface NavLinkButtonsProps {
    toLink: string;
    page: string;
}

export default function NavLinkButton(props: NavLinkButtonsProps) {
    let daToLink = props.toLink ? props.toLink : '/';
    return (
        <Link to={daToLink} key={props.page + daToLink}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
                {props.page}
            </Button>
        </Link>
    )
}
