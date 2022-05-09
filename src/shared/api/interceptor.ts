import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {createBrowserHistory} from 'history';
import Cookies from 'js-cookie';

import {TOKEN} from '@shared/constants';
import {constants, localNotification} from '@shared/helpers';
import {useAuthStore} from '@store/auth';

const {notifyError} = localNotification;

const history = createBrowserHistory();

const apiReq = axios.create({
    baseURL: constants.URL,
    headers: {},
});

apiReq.interceptors.request.use((config: AxiosRequestConfig | any) => {
    const companyToken = Cookies.get(TOKEN.AUTH_TOKEN);
    config.headers['authorization'] = `Bearer ${companyToken}`;
    return config;
});

apiReq.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        return response;
    },
    async (err: any) => {
        console.log(err.message, 'err', err);

        let unAuthError = true;

        const navigateToLogin = () => {
            Cookies.remove(TOKEN.AUTH_TOKEN);
            history.push('/');
        };

        if (err.message === 'Network Error') {
            notifyError('Network Error');
            useAuthStore.setState({loadingLogin: false});
            navigateToLogin();
        }

        if (err?.response?.status === 401) {
            navigateToLogin();
            unAuthError = true;
        }
        if (unAuthError && err?.response?.status === 401) {
            notifyError(err?.response?.data?.error);
        } else if (err?.response?.status !== 401) {
            notifyError(err?.response?.data?.error);
        }
        return Promise.reject(err);
    },
);

export default apiReq;
