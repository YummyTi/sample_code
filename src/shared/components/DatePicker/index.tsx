import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import React from 'react';

import CalendarDateIc from '@src/images/svgs/CalendarDateIc';

interface IProps {
    value: Date | null;
    setValue: (newValue: Date | null) => void;
}

const DatePicker = ({value = new Date(), setValue}: IProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="datePickBox">
                <div className="left__side">
                    <CalendarDateIc />
                </div>
                <div className="right__side">
                    {/* <input
                    type="date"
                    placeholder=""
                    data-date-inline-picker="true"
                /> */}
                    <MobileDatePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        renderInput={(params) => (
                            <TextField size="small" {...params} />
                        )}
                    />
                </div>
            </div>
        </LocalizationProvider>
    );
};

export default DatePicker;
