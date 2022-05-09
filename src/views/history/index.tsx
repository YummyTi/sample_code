import {TopBar, useDateTimeModel} from '@widgets/TopBarController';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {AutoScrollTable} from './Components/AutoScrollTable';
import {HistoryMap} from './Components/HistoryMap';
import {HistorySlider} from './Components/HistorySlider';
import {InformativeTableWrapper} from './Components/InformativeTable';
import classNames from './index.module.scss';

const HistoryPage = () => {
    const {t} = useTranslation();
    const [date, time] = useDateTimeModel(
        (state) => [state.date, state.time],
        shallow,
    );

    const generate = () => {
        console.log('generate', date, time);
    };

    return (
        <div className={classNames.historyContainer}>
            <div className={classNames.leftTablesContainer}>
                <div className={classNames.leftSideTitle}>{t('data')}</div>
                <div className={classNames.leftTables}>
                    <AutoScrollTable />
                    <InformativeTableWrapper />
                </div>
            </div>

            <div className={classNames.rightContent}>
                <TopBar title={t('history')} generate={generate} />
                <div className={classNames.historyMapContainer}>
                    <HistoryMap />
                    <HistorySlider />
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
