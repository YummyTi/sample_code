import {lazy} from 'react';

import RolesPage from '@src/views/manage/main/RolesPage';
// const VehicleFuelType = lazy(
//     () => import('@views/vehicle_model/pages/FuelType'),
// );
import FuelType from '@src/views/manage/vehicle_model/FuelType';

import {PERMISSION, TOKEN} from '@shared/constants';
import {useAuthStore} from '@store/auth';

import SettingsIcon from '@images/svgs/SettingsIcon';

const VehicleModel = lazy(() => import('@src/views/manage/vehicle_model'));

interface ISidebar {
    Icon: any;
    text: string;
    path?: string;
    permission: any;
    component?: any;
    index?: boolean;
}

const useSubBusModelRoute = () => {
    const userInfo = useAuthStore((state) => state.userInfo);

    const handleFindPermission = (permission: string) => {
        let foundRoute = [];
        if (userInfo?.permissions?.length) {
            foundRoute = userInfo?.permissions?.filter(
                (item: any) => item === permission,
            );
        } else {
            const permissions = JSON.parse(
                localStorage.getItem(TOKEN.PERMISSIONS) || '[]',
            );

            foundRoute = permissions?.filter(
                (item: any) => item === permission,
            );
        }

        return foundRoute;
    };

    const subMainRoutes: ISidebar[] = [
        {
            Icon: SettingsIcon,
            text: 'Права доступа',
            permission: handleFindPermission(PERMISSION.USER),
            component: VehicleModel,
            index: true,
        },
        {
            Icon: SettingsIcon,
            text: 'Роли',
            path: 'fule_types',
            permission: [],
            component: FuelType,
        },
    ];

    return {subMainRoutes};
};

export default useSubBusModelRoute;
