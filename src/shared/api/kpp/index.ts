import apiReq from '@src/shared/api/interceptor';

export const getKppById = async (id: number) => {
    const response = await apiReq.get(
        `manage/station/getKppsByRoute?route_id=${id}`,
    );
    return response;
};

export const getKpps = async () => {
    const response = await apiReq.get('manage/station/getKpps');
    return response;
};
