import apiReq from '@src/shared/api/interceptor';
import {IPoint} from '@src/shared/models/point_model';

export const savePoints = async (body: IPoint) => {
    const response = await apiReq.post(`manage/route/save/points`, {
        ...body,
    });

    return response;
};

export const getPointById = async (id: any) => {
    const response = await apiReq.get(`manage/route/getPoints?route_id=${id}`);

    return response;
};
