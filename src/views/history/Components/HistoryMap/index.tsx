// @ts-nocheck
import React from 'react';
import {Map, YMaps} from 'react-yandex-maps';

import {constants} from '@src/shared/helpers';

export const HistoryMap = () => {
    const {YENUM, tashkentzoom, yQuery, yStyle} = constants;
    return (
        <YMaps query={yQuery}>
            <Map
                width={'100%'}
                height={'100%'}
                defaultState={{
                    center: tashkentzoom,
                    zoom: 9,
                    controls: ['zoomControl', 'fullscreenControl'],
                }}
                modules={['control.ZoomControl', 'control.FullscreenControl']}
            />
        </YMaps>
    );
};
