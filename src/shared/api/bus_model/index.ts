import apiReq from '@src/shared/api/interceptor';
import {IBusModelJSON, IUpdateBusModel} from '@src/shared/models/bus_model';
import {ISaveFuelType} from '@src/shared/models/fuel_type_model';

export const getBusModels = async (params?: string) => {
    const response = await apiReq.get(`manage/busmodel/list${params || ''}`);
    return response;
};

export const getAllBusModels = async (): Promise<IBusModelJSON[]> => {
    const response = await apiReq.get('manage/busmodel/listAll');
    return response?.data?.data;
};

export const searchBusModel = async (params: string | number) => {
    const response = await apiReq.get(`manage/busmodel/search?like=${params}`);
    return response;
};

export const saveBusModel = async (payload: IUpdateBusModel) => {
    console.log('Save data: ', payload);

    const response = await apiReq.post(`manage/busmodel/save`, {
        ...payload,
    });

    return response;
};

export const deleteBusModel = async (ids: number[] | string[]) => {
    const response = await apiReq.post(`manage/busmodel/delete`, {
        ids,
    });
    return response;
};

//fuel requests
export const getFuelTypeList = async () => {
    const response = await apiReq.get(`manage/busmodel/fueltype/list`);
    return response;
};

export const saveFuel = async (payload: ISaveFuelType) => {
    const response = await apiReq.post(`manage/busmodel/fueltype/save`, {
        ...payload,
    });
    return response;
};

export const deleteFuel = async (ids: string[] | number[]) => {
    const response = await apiReq.post(`manage/busmodel/fueltype/delete`, {
        ids: [...ids],
    });

    return response;
};
