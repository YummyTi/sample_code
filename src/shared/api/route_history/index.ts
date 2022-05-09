import apiReq from '@src/shared/api/interceptor';

export const getHistory = (entity_name: string) => {
    const response = apiReq.get(
        `manage/route/lastUser?entity_name=${entity_name}`,
    );
    return response;
};
