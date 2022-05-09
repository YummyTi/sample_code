import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import DataLoading from '@src/shared/hoc/DataLoading';

import {useDiffNormQuery} from '@api/diff_norm/hooks';
import {DiffNormData} from '@models/diff_norm_models';
import {useDiffNormStore} from '@store/race_fuel';

import GreenBackPlusIcon from '@images/svgs/GreenBackPlusIcon';
import IconBus from '@images/svgs/IconBus';

import BusModels from '../BusModels';
import RouteModal from '../RouteModal';
import s from './index.module.scss';

const RoutesField = () => {
    const {t} = useTranslation();
    const {setRouteData, setRouteOpen, setModelOpen, isModelOpen, isRouteOpen} =
        useDiffNormStore((state) => state, shallow);
    const diffNorm = useDiffNormQuery();

    const openModal = (routeData: DiffNormData, setOpen: () => void) => {
        setRouteData(routeData);
        setOpen();
    };

    return (
        <div className={s.wrapper}>
            <DataLoading loading={diffNorm.isLoading} data={diffNorm.data}>
                {diffNorm.data?.map((routeData) => (
                    <div key={routeData.route_id} className={s.block}>
                        <div className={s.routeNumber}>
                            <span>{routeData.route_name}</span>
                        </div>
                        <div
                            className={s.models}
                            onClick={() => openModal(routeData, setRouteOpen)}
                        >
                            {routeData?.diffNormItems?.map((item) => (
                                <div key={item.id} className={s.busModel}>
                                    <IconBus className={s.busIcon} />
                                    <span>{item.bus_model_name}</span>
                                </div>
                            ))}
                        </div>
                        <div
                            className={s.addModel}
                            onClick={() => openModal(routeData, setModelOpen)}
                        >
                            <div className={s.add}>
                                <GreenBackPlusIcon className={s.addIcon} />
                                <span>{t('add')}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </DataLoading>

            {isRouteOpen && <RouteModal />}
            {isModelOpen && <BusModels />}
        </div>
    );
};

export default RoutesField;
