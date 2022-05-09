import Cookies from 'js-cookie';
import {useMutation, useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {TOKEN} from '@src/shared/constants';
import {useAuthStore} from '@src/shared/store/auth';

import {localNotification} from '@shared/helpers';

import useAuthPermit from './hooks';
import {AuthT, authReq, getPermissions} from './index';

const {notifyError} = localNotification;

const useAuthReq = () => {
    useAuthPermit();
    const {setLoadingLogin} = useAuthStore((state) => ({...state}), shallow);

    const handleLogin = useMutation((data: AuthT) => authReq(data), {
        onSuccess: (data) => {
            const accessToken = data.data.data;
            Cookies.set(TOKEN.AUTH_TOKEN, accessToken);
            setLoadingLogin(true);
        },
        onError: (e: any) => {
            notifyError(e?.response?.data?.status?.message);
            setLoadingLogin(false);
        },
    });

    return {
        handleLogin,
    };
};

export default useAuthReq;
