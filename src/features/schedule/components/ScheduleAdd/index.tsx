import Button from '@mui/material/Button';
import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {localNotification} from '@shared/helpers';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {useEditRouteStore} from '@store/edit_route';
import {useKppStore} from '@store/kpp';
import {useScheduleStore} from '@store/schedule';

import IconPlusRound from '@images/svgs/IconPlusRound';

import styles from './index.module.scss';

const {notifyWaring} = localNotification;

const ScheduleAdd = () => {
    const {t} = useTranslation();
    const setTab = useEditRouteStore((state) => state.setTab);
    const {setOpenM, setUpdate} = useScheduleStore(
        (state) => ({...state}),
        shallow,
    );
    const {kppById} = useKppStore((state) => state, shallow);
    const {canEdit} = useLocationPermission('routes');

    const handleOpenModal = () => {
        if (kppById?.length > 0) {
            setOpenM(true);
            setUpdate(false);
        } else {
            setTab('1');
            notifyWaring(t('noDataKpp'));
        }
    };

    return (
        <div className={styles.wrapper}>
            {canEdit && (
                <Button
                    onClick={handleOpenModal}
                    className={cx('btn__primary', styles.btn)}
                >
                    <IconPlusRound className={styles.iconAdd} />
                    {t('add_graphic')}
                </Button>
            )}
        </div>
    );
};

export default React.memo(ScheduleAdd);
