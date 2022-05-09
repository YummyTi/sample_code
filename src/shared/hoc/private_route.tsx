import Cookies from 'js-cookie';
import React, {Suspense} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

import Layout from '@src/layout/mainLayout';

import {TOKEN} from '@shared/constants';
import {useAuthStore} from '@shared/store/auth';

const PrivateRoute = () => {
    const location = useLocation();
    const isAuth = useAuthStore((state) => state.authed);
    const cookie = Cookies.get(TOKEN.AUTH_TOKEN);

    if (cookie || isAuth) {
        return (
            <Layout>
                <Suspense fallback={<div>Loading....</div>}>
                    <Outlet />
                </Suspense>
            </Layout>
        );
    } else {
        return <Navigate to="/" replace state={{path: location.pathname}} />;
    }
};

export default PrivateRoute;
