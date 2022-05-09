import React from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';

import {RouteNav} from '@features/vehicle_routes/components/RouteNav';

import EditRoutes from './routes';

interface LocationState {
    state: {
        newRoute: boolean;
        tab: string;
    };
}

const EditVehicleRoutePage = () => {
    const {t} = useTranslation();
    const location = useLocation();
    const params = location as LocationState;
    const newRoute = params.state.newRoute;

    return (
        <div className="editVehicleWrapper">
            <h2 className="editVehicleWrapper__title">
                {newRoute ? t('add_route') : t('editing_route')}
            </h2>
            <RouteNav />
            <EditRoutes />
        </div>
    );
};

export default EditVehicleRoutePage;
