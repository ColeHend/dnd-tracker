import Button from "@mui/material/Button";

interface NavButtonsProps {
    page: string;
}
export default function NavButton(props: NavButtonsProps) {
    return (
        <Button sx={{ my: 2, color: "white", display: "block" }}>
            {props.page}
        </Button>
    )
}