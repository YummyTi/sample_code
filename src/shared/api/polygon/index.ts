import apiReq from '@src/shared/api/interceptor';
import {PolygonSaveModel} from '@src/shared/models/polygon_model';

import {IParams} from './hooks';

export const getPolygons = async (params: IParams) => {
    const response = await apiReq.get(
        `manage/polygon/list?page=${params.page}&page_size=${params.pageSize}`,
    );
    return response;
};

export const savePolygon = async (body: PolygonSaveModel) => {
    const response = await apiReq.post(`manage/polygon/save`, body);
    return response;
};

export const getByRouteName = async (routeName: string, routeType: number) => {
    const param =
        routeType === 1
            ? `?routeName=${routeName}`
            : `?polygonName=${routeName}`;

    const response = await apiReq.get(`manage/polygon/search${param}`);
    return response;
};
