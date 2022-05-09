import {lazy, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import AccessRightsIcon from '@src/images/svgs/AccessRightsIcon';
import ActiveAccessright from '@src/images/svgs/ActiveAccessright';
import ActiveBusIcon from '@src/images/svgs/ActiveBusIcon';
import ActiveDifference from '@src/images/svgs/ActiveDifference';
import ActiveLogs from '@src/images/svgs/ActiveLogs';
import ActiveOrder from '@src/images/svgs/ActiveOrder';
import ActivePoint from '@src/images/svgs/ActivePoint';
import ActivePolygon from '@src/images/svgs/ActivePolygon';
import ActiveRouteIcon from '@src/images/svgs/ActiveRouteIcon';
import BusIcon from '@src/images/svgs/BusIcon';
import ControlPointIcon from '@src/images/svgs/ControlPointIcon';
import FilledRouteIcon from '@src/images/svgs/FilledRouteIcon';
import LabIcon from '@src/images/svgs/LabIcon';
import ModelsIcon from '@src/images/svgs/ModelsIcon';
import OrderIcon from '@src/images/svgs/OrderIcon';
import PolygonIcon from '@src/images/svgs/PolygonIcon';
import RoadIcon from '@src/images/svgs/RoadIcon';
import RouteIcon from '@src/images/svgs/RouteIcon';
import RoutesIcon from '@src/images/svgs/RoutesIcon';
import SettingsIcon from '@src/images/svgs/SettingsIcon';
import {PermissionEnum} from '@src/shared/constants';
import {useAuthStore} from '@src/shared/store/auth';
import {useLanguageStore} from '@src/shared/store/language';

const TransportsPage = lazy(() => import('@src/views/manage/transports'));
const VehiclePage = lazy(() => import('@src/views/manage/vehicle_model'));
const VehicleRoutesPage = lazy(
    () => import('@src/views/manage/vehicle_routes'),
);
const CheckpointsPage = lazy(() => import('@src/views/manage/checkpoints'));

const PolygonsPage = lazy(() => import('@src/views/manage/polygons'));

const OrderPage = lazy(() => import('@src/views/manage/order'));

const RacesFuelPage = lazy(() => import('@src/views/manage/races_fuel'));

const MainPage = lazy(() => import('@src/views/manage/main'));
const LogsPage = lazy(() => import('@src/views/manage/logs'));

interface ISidebar {
    Icon: any;
    ActiveIcon: any;
    text: string;
    path: string;
    permission: any;
    component?: any;
    index?: boolean;
}

const useSidebarRoutes = () => {
    const {t} = useTranslation();
    const userInfo = useAuthStore((state) => state.userInfo);
    const {lang} = useLanguageStore((state) => ({...state}), shallow);

    const handleFindPermission = (permission: string) => {
        if (userInfo.front_urls?.length) {
            const foundRoute = userInfo.front_urls?.filter(
                (item) => item.url === permission,
            );
            return foundRoute;
        } else {
            return [];
        }
    };

    const mainRoutes: ISidebar[] = useMemo(
        () => [
            {
                Icon: RouteIcon,
                ActiveIcon: RoutesIcon,
                text: t('autostation'),
                path: 'automobile',
                permission: handleFindPermission(PermissionEnum.automobile),
                component: RouteIcon,
            },
            {
                Icon: BusIcon,
                ActiveIcon: ActiveBusIcon,
                text: t('autotransports'),
                path: 'transports',
                permission: handleFindPermission(PermissionEnum.transports),
                component: TransportsPage,
            },
            {
                Icon: ModelsIcon,
                ActiveIcon: FilledRouteIcon,
                text: t('model_autotransports'),
                path: 'vehicle_model',
                permission: handleFindPermission(PermissionEnum.vehicle_model),
                component: VehiclePage,
            },
            {
                Icon: RoadIcon,
                ActiveIcon: ActiveRouteIcon,
                text: t('routes'),
                path: 'routes',
                permission: handleFindPermission(PermissionEnum.routes),
                component: VehicleRoutesPage,
            },
            {
                Icon: ControlPointIcon,
                ActiveIcon: ActivePoint,
                text: t('control_points'),
                path: 'checkpoints',
                permission: handleFindPermission(PermissionEnum.checkpoints),
                component: CheckpointsPage,
            },
            {
                Icon: PolygonIcon,
                ActiveIcon: ActivePolygon,
                text: t('polygons'),
                path: 'polygons',
                permission: handleFindPermission(PermissionEnum.polygons),
                component: PolygonsPage,
            },
            {
                Icon: OrderIcon,
                ActiveIcon: ActiveOrder,
                text: t('bus_order'),
                path: 'order',
                permission: handleFindPermission(PermissionEnum.order),
                component: OrderPage,
            },
            {
                Icon: LabIcon,
                ActiveIcon: ActiveDifference,
                text: t('fuel_difference'),
                path: 'races_fuel',
                permission: handleFindPermission(PermissionEnum.races_fuel),
                component: RacesFuelPage,
            },
            {
                Icon: AccessRightsIcon,
                ActiveIcon: ActiveAccessright,
                text: t('access_rights'),
                path: 'main',
                permission: handleFindPermission(PermissionEnum.main),
                component: MainPage,
                index: true,
            },
            {
                Icon: SettingsIcon,
                ActiveIcon: ActiveLogs,
                text: t('logs'),
                path: 'logs',
                permission: handleFindPermission(PermissionEnum.logs),
                component: LogsPage,
            },
        ],
        [t, handleFindPermission],
    );

    const [routes, setRoutes] = useState<ISidebar[]>(mainRoutes);

    useEffect(() => {
        setRoutes(mainRoutes);
    }, [userInfo, t, lang]);

    return {
        routes,
    };
};

export default useSidebarRoutes;
