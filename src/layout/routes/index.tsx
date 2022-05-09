import {lazy} from 'react';

import {PERMISSION} from '@shared/constants';
import {useAuthStore} from '@shared/store/auth';
import AutoMobilePage from '@views/manage/automobile';
import FuelType from '@views/manage/vehicle_model/FuelType';
import EditVehicleRoutePage from '@views/manage/vehicle_routes/pages';

import SettingsIcon from '@images/svgs/SettingsIcon';

const TransportsPage = lazy(() => import('@views/manage/transports'));
const VehiclePage = lazy(() => import('@views/manage/vehicle_model'));
const VehicleRoutesPage = lazy(() => import('@views/manage/vehicle_routes'));
const CheckpointsPage = lazy(() => import('@views/manage/checkpoints'));
const PolygonsPage = lazy(() => import('@views/manage/polygons'));
const OrderPage = lazy(() => import('@views/manage/order'));
const SchedulesPage = lazy(() => import('@views/manage/schedules'));
const RacesFuelPage = lazy(() => import('@views/manage/races_fuel'));
const MainPage = lazy(() => import('@views/manage/main'));
const LogsPage = lazy(() => import('@views/manage/logs'));
const SavePolygon = lazy(
    () => import('@views/manage/polygons/pages/SavePolygon'),
);
const EditPolygon = lazy(
    () => import('@views/manage/polygons/pages/EditPolygon'),
);

interface ISidebar {
    Icon: any;
    text: string;
    path?: string;
    permission: any;
    component?: any;
    index?: boolean;
}

export const handleFindPermission = (permission: string) => {
    const userInfo = useAuthStore.getState().userInfo?.permissions;
    let foundRoute: string[] = [];
    if (userInfo?.length) {
        foundRoute = userInfo?.filter((item: any) => item === permission);
    }

    return foundRoute;
};

export const routes: ISidebar[] = [
    {
        Icon: SettingsIcon,
        text: 'Автопредприятии',
        path: 'automobile',
        permission: handleFindPermission(PERMISSION.PARK),
        component: AutoMobilePage,
    },
    {
        Icon: SettingsIcon,
        text: 'Автотранспорты',
        path: 'transports',
        permission: handleFindPermission(PERMISSION.BUS),
        component: TransportsPage,
    },
    {
        Icon: SettingsIcon,
        text: 'Маршруты',
        path: 'routes',
        permission: handleFindPermission(PERMISSION.ROUTE),
        component: VehicleRoutesPage,
    },
    {
        Icon: SettingsIcon,
        text: 'Контрольные точки',
        path: 'checkpoints',
        permission: handleFindPermission(PERMISSION.POINT_TYPE),
        component: CheckpointsPage,
    },
    {
        Icon: SettingsIcon,
        text: 'Полигоны',
        path: 'polygons',
        permission: handleFindPermission(PERMISSION.POLYGON),
        component: PolygonsPage,
    },
    {
        Icon: null,
        text: 'Save polygon',
        path: 'polygons/save',
        permission: handleFindPermission(PERMISSION.POLYGON),
        component: SavePolygon,
    },
    {
        Icon: null,
        text: 'Edit polygon',
        path: 'polygons/edit',
        permission: handleFindPermission(PERMISSION.POLYGON),
        component: EditPolygon,
    },
    {
        Icon: SettingsIcon,
        text: 'Разнарядка',
        path: 'order',
        permission: handleFindPermission(PERMISSION.POLYGON),
        component: OrderPage,
    },
    {
        Icon: SettingsIcon,
        text: 'Расписания',
        path: 'schedules',
        permission: handleFindPermission(PERMISSION.MSCHEDULE),
        component: SchedulesPage,
    },
    {
        Icon: SettingsIcon,
        text: 'Дифф. нор. рас. топлива',
        path: 'races_fuel',
        permission: handleFindPermission(PERMISSION.FUELING),
        component: RacesFuelPage,
    },
    {
        Icon: SettingsIcon,
        text: 'Права доступа',
        path: 'main',
        permission: handleFindPermission(PERMISSION.USER),
        component: MainPage,
        index: true,
    },
    {
        Icon: SettingsIcon,
        text: 'Логи',
        path: 'logs',
        permission: handleFindPermission(PERMISSION.LOGGING),
        component: LogsPage,
    },
];

export const vehicleRoutes: ISidebar[] = [
    {
        Icon: SettingsIcon,
        text: 'Модели aвтотранспорта',
        index: true,
        path: 'vehicle_model',
        permission: handleFindPermission(PERMISSION.MODEL),
        component: VehiclePage,
    },
    {
        Icon: SettingsIcon,
        text: 'Маршруты автотранспорта',
        path: 'vehicle_model/fule_types',
        permission: ['Vehicle routes'],
        component: FuelType,
    },
];

export const vehicleRouteSubRoutes: ISidebar[] = [
    {
        Icon: SettingsIcon,
        text: 'Редактировать маршрут',
        index: true,
        path: 'edit_vehicleRoute',
        permission: handleFindPermission(PERMISSION.ROUTE),
        component: EditVehicleRoutePage,
    },
];

export const polygonRoutes: ISidebar[] = [
    {
        Icon: null,
        text: 'Edit polygon',
        path: 'polygons/save',
        permission: handleFindPermission(PERMISSION.POLYGON),
        component: SavePolygon,
    },
];
