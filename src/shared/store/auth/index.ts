import create, {GetState, SetState} from 'zustand';
import {StoreApiWithPersist, persist} from 'zustand/middleware';

import {VERSION} from '@src/shared/constants';

import {IPermit} from './scheme';

type IAuth = {
    authed: boolean;
    showPassword: boolean;
    userInfo: Partial<IPermit>;
    loadingLogin: boolean;
    setLoadingLogin: (loadingLogin: boolean) => void;
    setUserInfo: (userInfo: IPermit) => void;
    setShowPassword: (payload: boolean) => void;
    loggedIn: (payload: boolean) => void;
};

export const useAuthStore = create<
    IAuth,
    SetState<IAuth>,
    GetState<IAuth>,
    StoreApiWithPersist<IAuth>
>(
    persist(
        (set) => ({
            authed: false,
            showPassword: false,
            userInfo: {},
            loadingLogin: false,
            setLoadingLogin: (loadingLogin: boolean) => {
                set((state) => ({...state, loadingLogin}));
            },
            setUserInfo: (userInfo: IPermit) => {
                set({
                    userInfo: userInfo,
                });
            },
            setShowPassword: (payload: any): void => {
                set({showPassword: payload});
            },
            loggedIn: (payload: any): void => {
                set({authed: payload});
            },
        }),
        {
            name: 'auth',
            version: VERSION.V1,
        },
    ),
);
