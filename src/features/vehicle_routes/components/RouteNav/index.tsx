import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import Detail from '@src/images/svgs/Detail';
import Etalon from '@src/images/svgs/Etalon';
import Passport from '@src/images/svgs/Passport';
import Protocol from '@src/images/svgs/Protocol';
import Schedule from '@src/images/svgs/Schedule';
import Scheme from '@src/images/svgs/Scheme';
import {useEditRouteStore} from '@src/shared/store/edit_route';

export const RouteNav = () => {
    const {t} = useTranslation();
    const {tab, setTab} = useEditRouteStore((state) => ({...state}), shallow);

    const handleSwitch = (value: any) => {
        setTab(value);
    };
    const tabBtns = useMemo(() => {
        return [
            {
                name: t('passport'),
                img: <Passport />,
                value: '1',
            },
            {
                name: t('etalon'),
                img: <Etalon />,
                value: '2',
            },
            {
                name: t('scheme'),
                img: <Scheme />,
                value: '3',
            },
            {
                name: t('protocol'),
                img: <Protocol />,
                value: '4',
            },
            {
                name: t('schedule'),
                img: <Schedule />,
                value: '5',
            },
        ];
    }, [t]);

    return (
        <div className="vehicleRouteTab">
            {tabBtns.map((item, index) => {
                return (
                    <button
                        key={index}
                        className={`vehicleRouteTab__btn ${
                            +tab === +item.value ? 'activeVehicleRouteTab' : ''
                        }`}
                        onClick={() => handleSwitch(item.value)}
                    >
                        {item.img}
                        <span className="vehicleRouteTab__title">
                            {item.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

// {
//     name: t('details'),
//     img: <Detail />,
//     value: '4',
// },
