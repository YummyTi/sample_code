import React, {lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {
    polygonRoutes,
    routes,
    vehicleRouteSubRoutes,
    vehicleRoutes,
} from '@src/layout/routes';
import useMainRoute from '@src/layout/routes/useMainRoute';
import {ControlIntervalPrint} from '@src/views/alert/kpp/Components/PrintComponents';
import {TestPage} from '@src/views/alert/prostoy/test';
import Login from '@src/views/login';
import {MonitoringPage} from '@src/views/monitoring';

import PrivateRoute from '@shared/hoc/private_route';
import PublicRoute from '@shared/hoc/public_route';
import KppInterval from '@views/alert/kpp';
import Prostoy from '@views/alert/prostoy';
import HistoryPage from '@views/history';
import NotFoundPage from '@views/not_found';

const Main = lazy(() => import('@views/manage/main'));

const Routings = () => {
    const {subMainRoutes} = useMainRoute();

    return (
        <Routes>
            <Route path="/" element={<PublicRoute />}>
                <Route index element={<Navigate to="/login" />} />
                <Route path="login" element={<Login />} />
            </Route>

            <Route path="manage" element={<PrivateRoute />}>
                <Route index element={<Navigate to="/manage/main" />} />

                {vehicleRoutes.map((item) => (
                    <Route
                        key={item.path}
                        path={item.path}
                        element={<item.component />}
                    />
                ))}

                {routes.map((item) => (
                    <Route
                        key={item.path}
                        path={item.path}
                        element={<item.component />}
                    />
                ))}

                <Route path="routes">
                    {vehicleRouteSubRoutes?.map((item) => (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={<item.component />}
                        />
                    ))}
                </Route>

                <Route path="main">
                    <Route index element={<Main />} />
                    {subMainRoutes?.map((item) => (
                        <Route
                            key={item.path}
                            path={item.path}
                            index={item.index}
                            element={<item.component />}
                        />
                    ))}
                </Route>

                <Route path="polygons">
                    {polygonRoutes?.map((item) => (
                        <Route
                            key={item.path}
                            path={item.path}
                            index={item.index}
                            element={<item.component />}
                        />
                    ))}
                </Route>
            </Route>

            <Route path="history" element={<PrivateRoute />}>
                <Route index element={<HistoryPage />} />
            </Route>

            <Route path="alert" element={<PrivateRoute />}>
                <Route index element={<Navigate to="/alert/prostoy" />} />
                <Route path="interval" element={<KppInterval />} />
                <Route path="prostoy" element={<Prostoy />} />
            </Route>

            <Route path="monitoring" element={<PrivateRoute />}>
                <Route index element={<MonitoringPage />} />
            </Route>
            <Route
                path="printControlInterval"
                element={<ControlIntervalPrint />}
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default Routings;
