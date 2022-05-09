import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Popover from '@mui/material/Popover';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {IOnlineUsersModel} from '@models/online_users_model';
import {useHeaderStore} from '@store/header';

import styles from './index.module.scss';

interface IProps {
    isLoading: boolean;
    data: IOnlineUsersModel[];
}

const OnlineUsers = ({isLoading, data}: IProps) => {
    const {t} = useTranslation();
    const anchorEl = useHeaderStore((state) => state.openOnline);
    const toggle = useHeaderStore((state) => state.setOpenOnline);
    const open = Boolean(anchorEl);

    const handlePopoverClose = () => {
        toggle(null);
    };

    return (
        <Popover
            id="mouse-over-popover-online-users"
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            onClose={handlePopoverClose}
        >
            <div className={styles.content}>
                {isLoading ? (
                    <div className={styles.loader}>
                        <CircularProgress />
                    </div>
                ) : data?.length > 0 ? (
                    <div className={styles.onlineUsers}>
                        {data.map((item) => {
                            return (
                                <div
                                    key={item.sessionId}
                                    className={styles.user}
                                >
                                    <AccountCircleIcon />
                                    <div className={styles.textWrap}>
                                        <p className={styles.uname}>
                                            {item.uname}
                                        </p>
                                        <p className={styles.subText}>
                                            {item.host}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>{t('no_online_user')}</div>
                )}
            </div>
        </Popover>
    );
};

export default OnlineUsers;
