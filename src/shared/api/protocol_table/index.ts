import apiReq from '@src/shared/api/interceptor';
import {IProtocolSave} from '@src/shared/models/protocolData_model';

export const getProtocolData = async (id: number) => {
    const response = await apiReq.get(
        `manage/route/getProtocol?route_id=${id}`,
    );
    return response.data;
};

export const saveProtocolData = async (body: IProtocolSave) => {
    const response = await apiReq.post(`manage/route/save/protocol`, {
        ...body,
    });

    return response;
};
