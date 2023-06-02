import NavLinkButton from "../buttons/navLinkButton";

interface navLinkRowProps {
    pages: {
        page: string;
        toLink: string;
    }[]
}
export default function NavLinkRow(props: navLinkRowProps) {
    const { pages } = props;
    return (
        <>
            {
                pages.map((page) => (
                    <NavLinkButton {...page} />
                ))
            }
        </>
    )
}