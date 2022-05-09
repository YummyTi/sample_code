import React from 'react';
import {useTranslation} from 'react-i18next';

import LogsData from '@features/logs/components/LogsData';

import styles from './index.module.scss';

const Logs = () => {
    const {t} = useTranslation();
    return (
        <div className="main__container">
            <div className="header">
                <div className="headerContainer">
                    <h3 className="headerText">{t('logs_journal')}</h3>
                </div>
            </div>
            <div className={styles.bodyWrapper}>
                <LogsData />
            </div>
        </div>
    );
};

export default Logs;
