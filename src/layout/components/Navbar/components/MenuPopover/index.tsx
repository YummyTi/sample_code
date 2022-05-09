import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import cl from 'classnames';
import Cookies from 'js-cookie';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {TOKEN} from '@shared/constants';
import {useAuthStore} from '@store/auth';
import {useHeaderStore} from '@store/header';

import styles from './index.module.scss';

const MenuPopover = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const userInfo = useAuthStore((state) => state.userInfo);
    const {name} = userInfo;

    const anchorEl = useHeaderStore((state) => state.openMenu);
    const toggle = useHeaderStore((state) => state.setOpenMenu);

    const open = Boolean(anchorEl);
    const handleLogout = () => {
        Cookies.remove(TOKEN.AUTH_TOKEN);
        localStorage.clear();
        navigate('/login');
        toggle(null);
    };

    const handlePopoverClose = () => {
        toggle(null);
    };

    return (
        <Popover
            id="mouse-over-popover"
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            onClose={handlePopoverClose}
        >
            <div className={styles.content}>
                <div className={cl('flex__center', 'gap_10')}>
                    <div className="avatar">
                        {`${name?.charAt(0)} ${name?.charAt(1)}`}
                    </div>
                    <p>{name}</p>
                </div>
                <div className="flex__center">
                    <Button
                        color="error"
                        size="small"
                        className={styles.btnLog}
                        variant="outlined"
                        onClick={handleLogout}
                    >
                        {t('quit')}
                    </Button>
                </div>
            </div>
        </Popover>
    );
};

export default MenuPopover;
