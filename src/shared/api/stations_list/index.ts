import apiReq from '@src/shared/api/interceptor';

import {IStationSave} from '@models/station_model';

export const getStationsList = async () => {
    const response = await apiReq.get(`manage/station/list`);
    return response;
};

export const getSearchedStations = async (
    searchedTerm: string,
    text: string | number,
) => {
    const response = await apiReq.get(
        `manage/station/search?${searchedTerm}=${text}`,
    );
    return response;
};

export const postStation = async (data: IStationSave) => {
    const response = await apiReq.post(`manage/station/save`, data);
    return response;
};

export const removeStation = async (data: any) => {
    const response = await apiReq.post(`manage/station/delete`, data);
    return response;
};
