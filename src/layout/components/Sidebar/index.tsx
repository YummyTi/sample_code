import {IconButton, List} from '@mui/material';
import React from 'react';
import {useLocation} from 'react-router-dom';

import DoubleArrowBack from '@src/images/svgs/DoubleArrowBack';
import MenuIcon from '@src/images/svgs/MenuIcon';
import {Drawer, DrawerHeader} from '@src/layout/mixins';
import {useAlertRoutes} from '@src/layout/routes/alertSidebarRoutes';
import useSidebarRoutes from '@src/layout/routes/sidebarRoutes';
import {usePermissions} from '@src/shared/api/auth/hooks';

import {useLayoutStore} from '@shared/store/layout';

import Logo from '../Logo';
import styles from './index.module.scss';
import ListItemComponent from './listItem';

const Sidebar = () => {
    const path = useLocation().pathname;
    const {routes} = useSidebarRoutes();
    const alertRoutes = useAlertRoutes();
    const open = useLayoutStore((state) => state.open);
    const handleTap = useLayoutStore((state) => state.handleTap);

    usePermissions();

    const isManage = path.includes('manage');
    const isAlert = path.includes('alert');

    const sidebarRoutes = isManage
        ? routes
        : isAlert
        ? (alertRoutes as typeof routes)
        : routes;

    return (
        <Drawer className={styles.drawer} variant="permanent" open={open}>
            <div className={styles.container}>
                <div>
                    <DrawerHeader className={styles.drawerHeader}>
                        <Logo />
                    </DrawerHeader>

                    <List className={styles.list}>
                        {sidebarRoutes
                            ?.filter((item) => item?.permission?.length !== 0)
                            .map(({Icon, path, text, ActiveIcon}) => {
                                return (
                                    <ListItemComponent
                                        key={text}
                                        text={text}
                                        parentRoute={
                                            isManage ? 'manage' : 'alert'
                                        }
                                        path={path}
                                        Icon={Icon}
                                        ActiveIcon={ActiveIcon}
                                    />
                                );
                            })}
                    </List>
                </div>

                <div className={styles.sidebarBtn}>
                    {open ? (
                        <div className={styles.closeBtn}>
                            <IconButton onClick={() => handleTap(false)}>
                                <DoubleArrowBack />
                            </IconButton>
                        </div>
                    ) : (
                        <div className={styles.openBtn}>
                            <IconButton
                                color="inherit"
                                onClick={() => {
                                    handleTap(true);
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                    )}
                </div>
            </div>
        </Drawer>
    );
};

export default Sidebar;
