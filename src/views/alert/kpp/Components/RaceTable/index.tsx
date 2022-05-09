import React from 'react';
import {useTranslation} from 'react-i18next';

import s from './index.module.scss';

export const RaceTable = () => {
    const {t} = useTranslation();

    return (
        <div className="controlIntervaltableWrapper">
            <table className={'controlIntervalTable ' + s.raceTable}>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <span className={s.raceTableTitle}>
                                    {t('all_races_count')}
                                </span>
                                <span className={s.raceTableCount}>116</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <span className={s.raceTableTitle}>
                                    {t('races_with_violations')}
                                </span>
                                <span className={s.raceTableCount}>116</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <span className={s.raceTableTitle}>
                                    {t('unjustified_time')}
                                </span>
                                <span className={s.raceTableCount}>116</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <span className={s.raceTableTitle}>
                                    {t('regular_races')}
                                </span>
                                <span className={s.raceTableCount}>116</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <span className={s.raceTableTitle}>
                                    {t('with_lead')}
                                </span>
                                <span className={s.raceTableCount}>116</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
