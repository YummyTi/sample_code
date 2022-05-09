import {Button} from '@mui/material';
import React, {FC, useEffect} from 'react';
import shallow from 'zustand/shallow';

import DayPickerComponent from '@components/DayPicker';
import MultiSelect from '@components/Select';

import {useDateTimeModel} from '../model';
import s from './index.module.scss';
import {mySelectStyles} from './select-styles';

interface TopBarProps {
    title: string;
    generate: () => void;
    myDate?: string | Date;
}

const TopBar: FC<TopBarProps> = ({title, generate, myDate}) => {
    const {time, setTime, date, setDate, setDefault} = useDateTimeModel(
        (state) => state,
        shallow,
    );

    useEffect(() => {
        myDate && setDate(myDate);
        return () => setDefault();
    }, []);

    return (
        <div className={s.wrapper}>
            <span className={s.title}>{title}</span>

            <div className={s.rightSide}>
                <DayPickerComponent value={date} setValue={setDate} />

                <div className={s.inputWrapper}>
                    <div className={s.timeback}>От</div>
                    <input
                        className={s.input}
                        type="time"
                        name="from"
                        value={time.from}
                        onChange={setTime}
                    />
                </div>
                <div className={s.inputWrapper}>
                    <div className={s.timeback}>До</div>
                    <input
                        className={s.input}
                        type="time"
                        name="to"
                        value={time.to}
                        onChange={setTime}
                    />
                </div>

                <div className={s.generate}>
                    <MultiSelect
                        placeholder="Выберите маршрут"
                        {...mySelectStyles}
                    />
                    <Button className={s.button} onClick={generate}>
                        Генерировать
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(TopBar);
