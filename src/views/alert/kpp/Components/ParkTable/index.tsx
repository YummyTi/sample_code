import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {GarageButton} from './Components/GarageNumberButtons';
import s from './index.module.scss';

export const ParkTable = () => {
    const {t} = useTranslation();
    const data = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}];

    return (
        <div className="controlIntervaltableWrapper">
            <table className="controlIntervalTable">
                <tbody>
                    <tr>
                        <td>{t('bus_park')}</td>
                        <td>5 Парк</td>
                    </tr>
                    <tr>
                        <td>{t('route')}</td>
                        <td>1-A</td>
                    </tr>
                    <tr>
                        <td>{t('garage_number')}</td>
                        <td>
                            <div>
                                {data.map((item, index) => {
                                    return (
                                        <GarageButton
                                            key={index}
                                            value={item.value}
                                        />
                                    );
                                })}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>{t('all_garages')}</td>
                        <td>
                            <GarageButton value={t('all_routes')} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
