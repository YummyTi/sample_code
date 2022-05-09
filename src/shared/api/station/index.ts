import apiReq from '@src/shared/api/interceptor';

export const getStations = async ({routeId}: {routeId: number}) => {
    const response = await apiReq.get(
        `manage/station/getByRoute?route_id=${routeId}`,
    );
    return response;
};
