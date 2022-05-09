import apiReq from '@src/shared/api/interceptor';

export const getTotal = async () => {
    const response = await apiReq.get('manage/route/total');
    return response;
};

export const getRouteP = async (page: number, text: string) => {
    let params: any;
    if (text.length > 0) {
        params = `&like=${text}&page=${page}&size=10`;
    } else {
        params = `page=${page}&size=10`;
    }

    const response = await apiReq.get(`manage/route/list?${params}`);
    return response;
};

export const getRouteSearch = async (text: string) => {
    const response = await apiReq.get(`manage/route/search?like=${text}`);
    return response;
};

// mutations
export const savePassport = async (data: any) => {
    const response = await apiReq.post('manage/route/save/passport', data);
    return response;
};

export const deleteRoute = async (route_id: number) => {
    const response = await apiReq.delete(
        `manage/route/delete?route_id=${route_id}`,
    );
    return response;
};
