import blue from '@mui/material/colors/blue';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import React, {Component} from 'react';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

const withMui = (component: Component) => () =>
    (
        <ThemeProvider theme={theme}>
            {/* @ts-ignore */}
            {component()}
        </ThemeProvider>
    );

export default withMui;
