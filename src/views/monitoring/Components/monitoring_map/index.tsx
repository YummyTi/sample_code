// @ts-nocheck
import cx from 'classnames';
import React from 'react';
import {Map, YMaps} from 'react-yandex-maps';

import {tashkentzoom, yQuery} from '@src/shared/helpers/constants';

import s from './index.module.scss';

export const MonitoringMap = () => {
    return (
        <div className={cx(s.monitoringMapContainer)}>
            <YMaps query={yQuery}>
                <Map
                    width={'100%'}
                    height={'100%'}
                    defaultState={{
                        center: tashkentzoom,
                        zoom: 9,
                        controls: ['zoomControl', 'fullscreenControl'],
                    }}
                    modules={[
                        'control.ZoomControl',
                        'control.FullscreenControl',
                    ]}
                />
            </YMaps>
        </div>
    );
};
