import apiReq from '@src/shared/api/interceptor';

export const getStationTypeList = async () => {
    const response = await apiReq.get(`manage/station/type/list`);
    return response;
};
