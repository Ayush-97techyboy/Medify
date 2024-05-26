import { createTheme } from '@mui/material/styles';
import { colors, fonts } from './Variables';

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
        },
        secondary: {
            main: colors.secondary,
        },
        background: {
            default: colors.white,
        },
    },
    typography: {
        fontFamily: fonts.poppins,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                },
            },
        },
    },
});

export default theme;
