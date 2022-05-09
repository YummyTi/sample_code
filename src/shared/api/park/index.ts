import apiReq from '@src/shared/api/interceptor';

export const getParks = async (params: string, searchTerm: string) => {
    const query = searchTerm === '' ? `?${params}` : `?like=${searchTerm}`;

    const response = await apiReq.get(`manage/park/list${query}`);
    return response;
};

export const getTotalPark = async () => {
    const response = await apiReq.get(`manage/park/total`);
    return response;
};

export const savePark = async (data: any) => {
    const response = await apiReq.post(`manage/park/save`, {
        ...data,
    });

    return response;
};

export const updatePark = async (data: any) => {
    const response = await apiReq.post(`manage/park/update`, {
        ...data,
    });
    return response;
};

export const deletePark = async (id: string | number) => {
    const response = await apiReq.delete(`manage/park/deleted?parkId=${id}`);
    return response;
};

export const getParkById = async (id: string | number) => {
    const response = await apiReq.get(`manage/park/getById?parkId=${id}`);
    return response;
};

export const getByPark = async (id: string | number | false) => {
    const response = await apiReq.get(`manage/route/getByPark?park_id=${id}`);
    return response;
};

export const getGarageByPark = async (
    id: string | number | null | undefined,
) => {
    const response = await apiReq.get(
        `manage/park/getGaragesByPark?park_id=${id}`,
    );
    return response;
};
