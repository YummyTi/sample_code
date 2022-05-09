import {Checkbox} from '@mui/material';
import React from 'react';

import {useCheckbox} from './useCheckbox';

interface Props<T> {
    row: T;
}

export const SelectedCheckbox = <T extends {col1: number}>({row}: Props<T>) => {
    const {isChecked, toggleCheckbox} = useCheckbox<T>();

    return (
        <Checkbox
            checked={isChecked(row)}
            onClick={() => toggleCheckbox(row)}
            sx={{
                color: 'rgb(204, 206, 212)',
                '&.Mui-checked': {
                    color: '#606EEA',
                },
            }}
        />
    );
};
