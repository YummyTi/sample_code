import apiReq from '@src/shared/api/interceptor';

export const getRouteNames = async () => {
    const response = await apiReq.get(`manage/route/getRouteNames`);
    return response;
};
