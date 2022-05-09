import apiReq from '@src/shared/api/interceptor';
import {SaveEtalon} from '@src/shared/models/etalon_model';

export const saveEtalon = async (body: SaveEtalon) => {
    const response = await apiReq.post(`manage/route/save/etalon`, {
        ...body,
    });

    return response;
};

export const getEtalon = async (routeId: number) => {
    const response = await apiReq.get(
        `manage/route/getEtalon?route_id=${routeId}`,
    );
    return response;
};
