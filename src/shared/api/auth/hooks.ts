import Cookies from 'js-cookie';
import {useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import shallow from 'zustand/shallow';

import {handleFindPermission} from '@src/layout/routes';
import {TOKEN} from '@src/shared/constants';

import {useAuthStore} from '@store/auth';

import {getPermissions} from './index';

const useAuthPermit = () => {
    const navigation = useNavigate();
    const {setUserInfo, setLoadingLogin, loadingLogin} = useAuthStore(
        (state) => ({...state}),
        shallow,
    );
    const secureToken = Cookies.get(TOKEN.AUTH_TOKEN);

    const {isLoading} = useQuery(
        ['permissionsUser', loadingLogin],
        getPermissions,
        {
            retry: 1,
            refetchOnWindowFocus: true,
            enabled: loadingLogin && secureToken !== '',
            onSuccess: (data) => {
                setUserInfo(data.data.data);
                setLoadingLogin(false);
                localStorage.setItem(TOKEN.ROLE_NAME, data.data.data.roleName);
                handleFindPermission('some');
                navigation('/manage/main');
            },
            onError: (e) => {
                setLoadingLogin(false);
            },
        },
    );

    return {
        isLoading,
    };
};

export default useAuthPermit;

export const usePermissions = () => {
    const setUserInfo = useAuthStore((state) => state.setUserInfo);

    return useQuery(['permissions'], getPermissions, {
        retry: 1,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setUserInfo(data.data.data);
        },
    });
};
