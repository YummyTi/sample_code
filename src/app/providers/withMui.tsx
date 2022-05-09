import blue from '@mui/material/colors/blue';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import React from 'react';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

const withMui = (component: () => React.ReactElement) => () =>
    <ThemeProvider theme={theme}>{component()}</ThemeProvider>;

export default withMui;
