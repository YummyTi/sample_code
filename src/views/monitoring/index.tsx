import cx from 'classnames';
import React from 'react';

import {MonitoringBar} from './Components/monitoring_bar';
import {MonitoringMap} from './Components/monitoring_map';
import s from './index.module.scss';

export const MonitoringPage = () => {
    return (
        <div className={cx(s.monitoringPage)}>
            <MonitoringBar />
            <MonitoringMap />
        </div>
    );
};
