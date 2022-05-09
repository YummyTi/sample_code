import {ListItem, ListItemIcon, ListItemText, Tooltip} from '@mui/material';
import cx from 'classnames';
import React, {useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {useLayoutStore} from '@src/shared/store/layout';

import styles from './index.module.scss';

interface IListItem {
    path: string;
    parentRoute: 'manage' | 'alert';
    text: string;
    Icon: any;
    ActiveIcon: any;
}

const ListItemComponent = ({
    path,
    parentRoute,
    text,
    Icon,
    ActiveIcon,
}: IListItem) => {
    const navigate = useNavigate();

    const pathname = useLocation().pathname;

    const active = useMemo(() => pathname.includes(path), [pathname]);
    const open = useLayoutStore((state) => state.open);

    return (
        <ListItem
            onClick={() => navigate(`/${parentRoute}/${path}`)}
            button
            className={
                active ? cx(styles.active, styles.listItem) : styles.listItem
            }
        >
            <div className={styles.leftSide}>
                <Tooltip title={text}>
                    <ListItemIcon
                        className={
                            active ? cx(styles.listIcon) : styles.listIcon
                        }
                    >
                        {active ? <ActiveIcon /> : <Icon />}
                    </ListItemIcon>
                </Tooltip>

                {open && (
                    <ListItemText className={styles.listText} primary={text} />
                )}
            </div>
        </ListItem>
    );
};

export default ListItemComponent;
