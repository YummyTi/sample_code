import apiReq from '@src/shared/api/interceptor';
import {IUser, IUserUpdate} from '@src/shared/models/users_model';

export const getUsers = async ({
    page,
    size,
    status,
    searchText,
}: {
    page: number;
    size: number;
    status: boolean | string;
    searchText: string;
}) => {
    let param = ``;
    const statusMain = status === '' ? '' : `&is_active=${status}`;
    if (searchText === '') {
        param = `?page=${page}&size=${size}${statusMain}`;
    } else {
        param = `?search=${searchText}${statusMain}`;
    }

    const response = await apiReq.get(`manage/user/list${param}`);
    return response;
};

export const saveUser = async (body: IUser) => {
    const response = await apiReq.post(`manage/user/save`, {
        ...body,
    });
    return response;
};

export const updateUser = async (body: IUserUpdate) => {
    const response = await apiReq.post(`manage/user/update`, {
        ...body,
    });
    return response;
};

export const deletUser = async (id: number[]) => {
    const response = await apiReq.post(`manage/user/delete`, {
        ids: [...id],
    });
    return response;
};

export const usersParkList = async (id: string | number) => {
    const response = await apiReq.get(`manage/user/parks?userid=${id}`);
    return response;
};
