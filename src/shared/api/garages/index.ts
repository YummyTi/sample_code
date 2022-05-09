import apiReq from '@src/shared/api/interceptor';

export const getGarages = async () => {
    const response = await apiReq.get('manage/park/list/garages');
    return response;
};
