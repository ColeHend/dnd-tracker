import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';
import dark from './themes/dark';
import light from './themes/light';

type allThemes = 'dark' | 'light'

function getTheme(theme: allThemes) {
    switch (theme) {
        case "dark":
            return dark;
        case "light":
            return light;
        default:
            return dark;
    }
}

export default function CustomTheme(props: PropsWithChildren<{ theme?: allThemes }>) {
    const theTheme = createTheme(getTheme(props.theme ?? "dark"));
    return (
            <ThemeProvider theme={theTheme}>
                <CssBaseline />
                {props.children}
            </ThemeProvider>
    )
}
