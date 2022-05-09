import apiReq from '@src/shared/api/interceptor';

export type AuthT = {
    login: string;
    password: string;
};

export const authReq = async (data: AuthT) => {
    const response = await apiReq.post(`auth/login`, data);
    return response;
};

export const getPermissions = async () => {
    const response = await apiReq.get(`auth/me`);
    return response;
};
