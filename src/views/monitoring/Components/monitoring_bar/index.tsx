import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import s from './index.module.scss';

export const MonitoringBar = () => {
    const {t} = useTranslation();

    return (
        <div className={cx(s.monitoringBar)}>
            <div className={cx(s.monitoringBarTitle)}>{t('data')}</div>
        </div>
    );
};
