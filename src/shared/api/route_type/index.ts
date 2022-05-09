import apiReq from '@src/shared/api/interceptor';

export const getRouteType = async () => {
    const response = await apiReq.get('manage/route/getRouteType');
    return response.data;
};
