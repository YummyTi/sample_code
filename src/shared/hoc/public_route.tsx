import Cookies from 'js-cookie';
import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

import {TOKEN} from '@src/shared/constants';
import {useAuthStore} from '@src/shared/store/auth';

const PublicRoute = () => {
    const location = useLocation();
    const cookie = Cookies.get(TOKEN.AUTH_TOKEN);
    const isAuth = useAuthStore((state) => state.authed);

    if (!isAuth && !cookie) {
        return <Outlet />;
    } else {
        return (
            <Navigate
                to="/manage/main"
                replace
                state={{path: location.pathname}}
            />
        );
    }
};

export default PublicRoute;
