import {styled} from '@mui/material';
import Slider from '@mui/material/Slider';
import React, {useEffect, useState} from 'react';

import PauseIcon from '@src/images/svgs/history/PauseIcon';
import PlayIcon from '@src/images/svgs/history/PlayIcon';
import StopIcon from '@src/images/svgs/history/StopIcon';

import {ControlButtonItem} from './Components/ControlButtonItem';
import s from './index.module.scss';

const CustomSlider = styled(Slider)({
    color: '#563EE4',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
        backgroundColor: '#D1D0FC',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#563EE4',
        border: '5px solid #fff',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        backgroundColor: '#563EE4',
        color: '#fff',
    },
});

export const HistorySlider = () => {
    const [controlStatus, setControlStatus] = useState('none');
    const handleControl = (value: string) => {
        setControlStatus(value);
    };

    const controlButtonConfig = [
        {
            icon: <PlayIcon />,
            type: 'play',
            handleControl,
            activeButton: s.activeControlButton,
            baseClassName: s.controlButton,
            status: controlStatus,
        },
        {
            icon: <PauseIcon />,
            type: 'pause',
            handleControl,
            activeButton: s.activeControlButton,
            baseClassName: s.controlButton,
            status: controlStatus,
        },
        {
            icon: <StopIcon />,
            type: 'stop',
            handleControl,
            activeButton: s.activeControlButton,
            baseClassName: s.controlButton,
            status: controlStatus,
        },
    ];

    return (
        <div className={s.historySliderConatiner}>
            <div className={s.control}>
                {controlButtonConfig.map((item: any, index: number) => {
                    return (
                        <ControlButtonItem
                            key={index}
                            icon={item.icon}
                            type={item.type}
                            handleControl={item.handleControl}
                            activeButton={item.activeButton}
                            baseClassName={item.baseClassName}
                            status={item.status}
                        />
                    );
                })}
            </div>
            <CustomSlider
                defaultValue={0}
                aria-label="Default"
                valueLabelDisplay="on"
            />
        </div>
    );
};
