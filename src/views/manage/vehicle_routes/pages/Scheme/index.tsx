import React from 'react';
import {useLocation} from 'react-router-dom';

import usePoints from '@api/points/hooks';
import useSavePoint from '@api/points/mutation';
import useStations from '@api/station/hooks';
import {LocationState} from '@features/schedule/components/Form/schema';
import SchemaMap from '@features/scheme/components/SchemaMap';
import {BtnSave} from '@features/vehicle_routes/components';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {useRouteStepStore} from '@store/route_step';
import {useStationsStore} from '@store/station';

import styles from './index.module.scss';

const Scheme = () => {
    const {canEdit} = useLocationPermission('routes');
    const location = useLocation();
    const stepRouteId = useRouteStepStore((state) => state.routeId);

    const {state} = location as LocationState;
    usePoints(state.routeId || stepRouteId);
    const {isLoading: stationLoading} = useStations(
        state.routeId || stepRouteId,
    );
    const {handleSave} = useSavePoint();
    const coords = useStationsStore((state) => state.coords);

    const handleSavePoint = () => {
        handleSave.mutate({
            route_id: state.routeId,
            coordinatesList: coords.map((item: any, index: number) => ({
                lat: item.lat,
                lng: item.lng,
                station_id: item.id ? item.id : null,
                point_order: index + 1,
            })),
        });
    };

    return (
        <div className={styles.container}>
            <SchemaMap />
            {canEdit && (
                <BtnSave
                    disabled={handleSave.isLoading}
                    loading={handleSave.isLoading}
                    handleSave={handleSavePoint}
                />
            )}
        </div>
    );
};

export default Scheme;
