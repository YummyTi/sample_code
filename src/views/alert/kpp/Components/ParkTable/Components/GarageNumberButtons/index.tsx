import Button from '@mui/material/Button';
import cx from 'classnames';
import React from 'react';

import s from './index.module.scss';

export const GarageButton = (props: any) => {
    const {value} = props;
    const handleGetGarage = (value: number) => {
        console.log('Garage: ', value);
    };
    return (
        <Button
            className={cx(s.parkTableBtn, s.parkTableBtnMargin)}
            onClick={() => handleGetGarage(value)}
        >
            {value}
        </Button>
    );
};
