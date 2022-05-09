// @ts-nocheck
import React, {useState} from 'react';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {useForm} from 'react-hook-form';

import SelectController from '../SelectController';
import styles from './index.module.scss';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

const YearMonthPicker = ({date, localeUtils, onChange, control}: any) => {
    const months = localeUtils.getMonths();

    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
        years.push(i);
    }

    const handleChange = (e: any) => {
        const {year, month} = e.target.form;
        onChange(new Date(year.value, month.value));
    };

    const monthOptions = months.map((month: any, i: any) => ({
        label: month,
        value: i,
    }));

    const yearOptions = years.map((month: any, i: any) => ({
        label: month,
        value: i,
    }));

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputWrapper}>
                <SelectController
                    name="month"
                    value={date.getMonth()}
                    control={control}
                    options={monthOptions}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <SelectController
                    name="year"
                    value={date.getFullYear()}
                    control={control}
                    options={yearOptions}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

const DatePicker = () => {
    const [month, setMonth] = useState<Date>();

    const {control} = useForm();

    const handleYearMonthChange = (date: Date) => {
        setMonth(date);
    };

    return (
        <div>
            <form>
                <DayPickerInput
                    showOverlay
                    dayPickerProps={{
                        month,
                        fromMonth,
                        toMonth,
                        captionElement: ({date, localeUtils}) => (
                            <YearMonthPicker
                                control={control}
                                date={date}
                                localeUtils={localeUtils}
                                onChange={handleYearMonthChange}
                            />
                        ),
                    }}
                />
            </form>
        </div>
    );
};

export default DatePicker;
