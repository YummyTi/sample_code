import 'react-day-picker/lib/style.css';

import cx from 'classnames';
import React, {useCallback} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import OutsideClickHandler from 'react-outside-click-handler';

import CalendarDateIc from '@src/images/svgs/CalendarDateIc';
import {formatDateInput} from '@src/shared/helpers/format-date';
import {useLanguageStore} from '@src/shared/store/language';

import styles from './index.module.scss';

const WEEKDAYS_SHORT: any = {
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    uz: ['Yak', 'Du', 'Se', 'Chor', 'Pay', 'Ju', 'Sha'],
};

const MONTHS: any = {
    ru: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
    uz: [
        'Yanvar',
        'Fevral',
        'Mart',
        'April',
        'May',
        'Iyun',
        'Iyul',
        'Avgust',
        'Sentabr',
        'Oktabr',
        'Noyabr',
        'Dekabr',
    ],
};

const WEEKDAYS_LONG: any = {
    ru: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ],
    uz: [
        'Yakshanba',
        'Dushanba',
        'Seshanba',
        'Chorshanba',
        'Payshanba',
        'Juma',
        'Shanba',
    ],
};

const FIRST_DAY_OF_WEEK: any = {
    ru: 1,
    uz: 1,
};

const LABELS: any = {
    ru: {nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц'},
    uz: {nextMonth: 'Keyingi oy', previousMonth: 'Keyingi oy'},
};

interface IProps {
    value: Date | string | undefined;
    setValue: (value: Date | string) => void;
}

const DayPickerComponent = ({value = new Date(), setValue}: IProps) => {
    const myRef = React.useRef<any>();
    const [open, setOpen] = React.useState(false);
    const locale = useLanguageStore((state) => state.lang.value);

    const handleClickShow = () => {
        myRef.current.showDayPicker();
        setOpen(true);
    };

    const handleClickHide = useCallback(() => {
        myRef.current.hideDayPicker();
        setOpen(false);
    }, []);

    return (
        <OutsideClickHandler onOutsideClick={handleClickHide}>
            <div
                className="datePickBox"
                onClick={() => {
                    if (!open) {
                        handleClickShow();
                    }
                }}
            >
                <div className={cx('left__side', [open && styles.active])}>
                    <CalendarDateIc className={styles.icon} />
                </div>
                <div
                    className={cx('right__side', [open && styles.activeInput])}
                >
                    <DayPickerInput
                        ref={myRef}
                        value={formatDateInput(value)}
                        dayPickerProps={{
                            locale: locale,
                            months: MONTHS[locale],
                            weekdaysLong: WEEKDAYS_LONG[locale],
                            weekdaysShort: WEEKDAYS_SHORT[locale],
                            firstDayOfWeek: FIRST_DAY_OF_WEEK[locale],
                            labels: LABELS[locale],
                            className: 'day__picker_input',
                        }}
                        onClick={handleClickShow}
                        onDayChange={(day) => setValue(day)}
                    />
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default React.memo(DayPickerComponent);
