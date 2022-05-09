import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import cx from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

import {OnlineUsers} from '@src/features/online_users';
import {AppBar} from '@src/layout/mixins';

import useOnlineUsers from '@api/online_users/hooks';
import Clock from '@components/Clock';
import {useAuthStore} from '@store/auth';
import {useHeaderStore} from '@store/header';
import {useLayoutStore} from '@store/layout';

import ArrowDowIcon from '@images/svgs/ArrowDowIcon';
import CalendarIcon from '@images/svgs/CalendarIcon';
import GeneralMenu from '@images/svgs/GeneralMenu';
import TimeIcon from '@images/svgs/TimeIcon';
import UserIcon from '@images/svgs/UserIcon';

import Logo from '../Logo';
import LangSelect from './components/LanguageSelect/LangSelect';
import MenuPopover from './components/MenuPopover';
import styles from './index.module.scss';

const Navbar = () => {
    const open = useLayoutStore((state) => state.open);
    const toggle = useHeaderStore((state) => state.setOpenMenu);
    const openOnline = useHeaderStore((state) => state.setOpenOnline);
    const userInfo = useAuthStore((state) => state.userInfo);
    const {name} = userInfo;
    const {isLoading, data} = useOnlineUsers();

    const {t} = useTranslation();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        toggle(event.currentTarget);
    };

    const handleOnline = (event: React.MouseEvent<HTMLElement>) => {
        openOnline(event.currentTarget);
    };

    return (
        <AppBar
            className={styles.appBar}
            color="inherit"
            position="fixed"
            open={open}
        >
            <Toolbar className={styles.toolbar}>
                <div className={styles.leftSide}>
                    <Logo />
                </div>

                <div>
                    <Link to="/manage">Manage</Link> |{' '}
                    <Link to="/history">History</Link> |{' '}
                    <Link to="/alert">Alert</Link> |{' '}
                    <Link to="/monitoring">Monitoring</Link>
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.onlineUsers}>
                        <UserIcon className={styles.icUser} />
                        <p className={styles.textUser}>{t('online_users')}</p>
                        <Chip
                            className={styles.chipColor}
                            label={data?.length}
                        />
                        <IconButton onClick={handleOnline}>
                            <ArrowDowIcon />
                        </IconButton>
                    </div>

                    <div className={styles.calendarWrapper}>
                        <CalendarIcon />
                        <p className={styles.dateTime}>
                            {dayjs().format('DD.MM.YYYY')}
                        </p>
                    </div>

                    <LangSelect />

                    <div className={cx(styles.calendarWrapper, styles.timer)}>
                        <TimeIcon />
                        <Clock />
                    </div>

                    <div className={styles.generalMenu}>
                        <GeneralMenu className={styles.gMenuIcon} />
                        <p className={cx('text__field', styles.menu)}>Menu</p>
                    </div>

                    <div
                        onClick={handleMenu}
                        className={cx(styles.user, 'flex__center')}
                    >
                        <p className={cx('text__field', styles.menu)}>{name}</p>
                        <div className="avatar">
                            {`${name?.charAt(0)} ${name?.charAt(1)}`}
                        </div>
                        <ArrowDowIcon className={styles.arrDwn} />
                    </div>

                    <OnlineUsers isLoading={isLoading} data={data} />
                    <MenuPopover />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default React.memo(Navbar);
