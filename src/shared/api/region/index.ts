import apiReq from '@src/shared/api/interceptor';

export const getRegions = async () => {
    const response = await apiReq.get(`manage/region/list`);
    return response;
};
