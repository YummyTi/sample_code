import apiReq from '@src/shared/api/interceptor';
import {ISavePassport} from '@src/shared/models/passport_model';

export const getPassportData = async (id: number) => {
    const response = await apiReq.get(
        `manage/route/getPassport?route_id=${id}`,
    );
    return response.data;
};

export const savePassport = async (body: ISavePassport) => {
    const response = await apiReq.post(`manage/route/save/passport`, body);
    return response;
};

export const checkPolygon = async (stationId: string | number) => {
    const response = await apiReq.get(
        `manage/station/checkPolygon?station_id=${stationId}`,
    );
    return response;
};
