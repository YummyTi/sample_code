import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import {useLocation} from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import styles from './layout.module.scss';
import {DrawerHeader, containerStyle, outletStyle} from './mixins';

const Layout = ({children}: any) => {
    const path = useLocation().pathname;
    const showSidebar = path.includes('manage') || path.includes('alert');

    return (
        <Box sx={containerStyle}>
            <CssBaseline />
            {/* AppBar  */}
            <Navbar />
            {/* Sidebar  */}
            {showSidebar && <Sidebar />}
            {/* Main Outlet  */}
            <Box className={styles.mainBox} component="main" sx={outletStyle}>
                <DrawerHeader className={styles.drawHead} />
                {children}
            </Box>
        </Box>
    );
};

export default React.memo(Layout);
