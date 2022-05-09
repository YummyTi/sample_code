import apiReq from '@src/shared/api/interceptor';

export const getLocations = async () => {
    const response = await apiReq.get(`activeBuses/monitoring`);
    return response;
};
