import apiReq from '@src/shared/api/interceptor';

export const getEmployees = async () => {
    const response = await apiReq.get('manage/employee/list');
    return response;
};
