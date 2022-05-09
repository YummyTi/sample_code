import apiReq from '@api/interceptor';
import {SavePermission} from '@models/permission_model';
import {IRoleModelState} from '@models/role_model';

export const getRoles = async ({params}: any) => {
    const response = await apiReq.get(`manage/role/list?${params}`);
    return response?.data?.data;
};

export const deleteRole = async (id: number[] | string[]) => {
    const response = await apiReq.post(`manage/role/delete`, {
        ids: [...id],
    });
    return response;
};

export const saveRole = async (data: IRoleModelState) => {
    const response = await apiReq.post(`manage/role/save`, data);
    return response;
};

export const savePermissionRole = async (data: SavePermission) => {
    const response = await apiReq.post(`manage/role/permission`, data);
    return response;
};
