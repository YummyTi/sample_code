import {TopBar, useDateTimeModel} from '@widgets/TopBarController';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import s from './index.module.scss';
import Table from './Table';

const Prostoy = () => {
    const {t} = useTranslation();
    const [date, time] = useDateTimeModel(
        (state) => [state.date, state.time],
        shallow,
    );

    const generate = () => {
        console.log('generate', date, time);
    };

    return (
        <>
            <TopBar
                title={t('prostoy')}
                generate={generate}
                myDate={new Date()}
            />

            <div className={s.wrapper}>
                <Table />
            </div>
        </>
    );
};

export default Prostoy;
