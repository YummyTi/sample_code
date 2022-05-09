import {lazy} from 'react';

import SettingsIcon from '@src/images/svgs/SettingsIcon';
import {PERMISSION, TOKEN} from '@src/shared/constants';
import {useAuthStore} from '@src/shared/store/auth';
import RolesPage from '@src/views/manage/main/RolesPage';

const MainPage = lazy(() => import('@src/views/manage/main'));

interface ISidebar {
    Icon: any;
    text: string;
    path?: string;
    permission: any;
    component?: any;
    index?: boolean;
}

const useMainRoute = () => {
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
            component: MainPage,
            index: true,
        },
        {
            Icon: SettingsIcon,
            text: 'Роли',
            path: 'roles',
            permission: [],
            component: RolesPage,
        },
    ];

    return {subMainRoutes};
};

export default useMainRoute;
