import {Button} from '@mui/material';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import usePark from '@api/park/hooks';
import DayPickerComponent from '@components/DayPicker';
import {CoefModal, ParkList, RoutesField} from '@features/diff_norm';
import {useDiffNormStore} from '@store/race_fuel';

import s from './index.module.scss';

const RacesFuel = () => {
    const [date, setDate] = useState<Date | string>();

    const {t} = useTranslation();
    const {isLoading} = usePark();
    const {isCoefOpen, setCoefOpen} = useDiffNormStore(
        (state) => state,
        shallow,
    );

    return (
        <div className={s.wrapper}>
            <div className="order__header">
                <div className="headText">{t('diff_norm_title')}</div>
                <div className={s.header}>
                    <Button
                        onClick={setCoefOpen}
                        className={s.button}
                        variant="contained"
                    >
                        {t('coef_list')}
                    </Button>
                    {isCoefOpen && <CoefModal />}
                    <DayPickerComponent value={date} setValue={setDate} />
                </div>
            </div>
            <div className="order__container">
                <ParkList isLoading={isLoading} />
                <RoutesField />
            </div>
        </div>
    );
};

export default RacesFuel;
