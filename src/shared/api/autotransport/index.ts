import apiReq from '@api/interceptor';

type Params = {
    page: number;
    size: number;
    searchText: string;
    key: string;
};

export const getAutoTrans = async ({page, size, searchText, key}: Params) => {
    const params = !searchText.length
        ? `list?page=${page}&size=${size}`
        : `search?field=${searchText}&key=${key}`;

    const response = await apiReq.get(`manage/bus/${params}`);

    return response;
};

export const getTotalAutoTrans = async () => {
    const response = await apiReq.get(`manage/bus/total`);
    return response;
};

export const saveAutoTransport = async (data: any) => {
    const response = await apiReq.post(`manage/bus/save`, {...data});
    return response;
};

export const updateAutoTransport = async (data: any) => {
    const response = await apiReq.post(`manage/bus/update`, data);
    return response;
};

export const deleteAutoTransport = async (id: number) => {
    const response = await apiReq.post('manage/bus/delete', id);
    return response;
};
