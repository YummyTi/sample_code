import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import React from 'react';
import {useTranslation} from 'react-i18next';

import HistoryIcon from '@src/images/svgs/HistoryIcon';
import useRouteHistory from '@src/shared/api/route_history/mutation';
import {RouteHistoryModel} from '@src/shared/models/route_model';

import styles from './index.module.scss';

interface IProps {
    routeName: string;
}

const HistoryComponent = ({routeName}: IProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {data, isLoading, mutate} = useRouteHistory();
    const {t} = useTranslation();

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        mutate(routeName);
        console.log('clicked');
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (action: string) => {
        if (action === 'ACTION_ADD') {
            return `${t('changed')} ${routeName} ${t('etalon')}`;
        } else {
            return `${t('changed')} ${routeName}`;
        }
    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ml: 2}}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <HistoryIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={style}
                transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                }}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom',
                }}
            >
                {isLoading ? (
                    <MenuItem>
                        <CircularProgress size={25} />
                    </MenuItem>
                ) : (
                    data?.data?.data?.length > 0 &&
                    data?.data?.data.map((item: RouteHistoryModel) => (
                        <MenuItem>
                            <Avatar className={styles.userIcon} />
                            <div className={styles.itemRow}>
                                <div className={styles.itemHead}>
                                    <p className={styles.userName}>
                                        {item.userName}
                                    </p>
                                    <span className={styles.timeText}>
                                        {dayjs(item.time).format('HH:mm')}
                                    </span>
                                </div>
                                <h5 className={styles.actionTime}>
                                    {handleAction(item.action)}
                                </h5>
                            </div>
                        </MenuItem>
                    ))
                )}
            </Menu>
        </div>
    );
};

export default HistoryComponent;

const style = {
    elevation: 0,
    sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
};
