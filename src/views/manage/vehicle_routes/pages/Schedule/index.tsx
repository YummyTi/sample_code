import CircularProgress from '@mui/material/CircularProgress';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';
import shallow from 'zustand/shallow';

import SchedulePagination from '@src/features/schedule/components/SchedulePagination';

import useKpp from '@api/kpp/hooks';
import {useGetAllKpps} from '@api/kpp/useGetAllKpps';
import useSchedule from '@api/schedule/hooks';
import useStations from '@api/station/hooks';
import ScheduleAdd from '@features/schedule/components/ScheduleAdd';
import ScheduleModal from '@features/schedule/components/ScheduleModal';
import ScheduleTable from '@features/schedule/components/ScheduleTable';
import {useRouteStepStore} from '@store/route_step';
import {useScheduleStore} from '@store/schedule';

import styles from './index.module.scss';

interface LocationState {
    state: {
        routeId: number;
    };
}

const Schedule = () => {
    useGetAllKpps();
    const {newData, clearStep, openM, shTotalCount} = useScheduleStore(
        (state) => ({...state}),
        shallow,
    );
    const {t} = useTranslation();
    const location = useLocation();
    const {state} = location as LocationState;
    const stepRouteId = useRouteStepStore((state) => state.routeId);

    const {isLoading} = useSchedule(state.routeId || stepRouteId);
    const {isLoading: stationLoading} = useStations(
        state.routeId || stepRouteId,
    );

    useKpp(state.routeId || stepRouteId);

    useEffect(() => {
        if (!openM) {
            clearStep();
        }
    }, [openM]);

    if (isLoading) {
        return (
            <div className="center">
                <CircularProgress />
            </div>
        );
    }

    if (newData?.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                {t('no_data')}
                <ScheduleAdd />
                <ScheduleModal />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ScheduleTable />

            <div className={styles.footer}>
                <ScheduleAdd />
                {shTotalCount > 10 && <SchedulePagination />}
            </div>

            <ScheduleModal />
        </div>
    );
};

export default Schedule;
