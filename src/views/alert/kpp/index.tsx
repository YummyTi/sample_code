import Button from '@mui/material/Button';
import {TopBar, useDateTimeModel} from '@widgets/TopBarController';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import DataLoading from '@shared/hoc/DataLoading';

import {KppTablesComponent} from './Components/ControlIntervalTable';
import {ParkTable} from './Components/ParkTable';
import {RaceTable} from './Components/RaceTable';
import s from './index.module.scss';

const KppInterval = () => {
    const {t} = useTranslation();
    const [date, time] = useDateTimeModel(
        (state) => [state.date, state.time],
        shallow,
    );
    const componentRef = useRef(null);

    const test = () => {
        window.open('/printControlInterval');
    };
    const generate = () => {
        console.log('generate', date, time);
    };

    return (
        <div>
            <TopBar title={t('interval_page')} generate={generate} />

            <DataLoading loading={false} data={['hello']}>
                <div className={s.controlIntervalWrapper}>
                    <div className={s.topTablesWrapper}>
                        <ParkTable />
                        <RaceTable />
                    </div>
                    <div className={s.exportBtnWrapper}>
                        <Button className={s.exportBtn} onClick={test}>
                            {t('export_to_pdf')}
                        </Button>
                    </div>
                    <div ref={componentRef} className={s.kppTables}>
                        <KppTablesComponent />
                    </div>
                </div>
            </DataLoading>
        </div>
    );
};

export default KppInterval;
