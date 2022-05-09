import apiReq from '@src/shared/api/interceptor';

type EmployeeModel = {
    id: number | string;
    routeId: number;
    date: string;
};

export const getGraphById = async ({id, routeId, date}: EmployeeModel) => {
    const response = await apiReq.get(
        `manage/route_exch/getGraph?route_id=${routeId}&graph_number=${id}&day=${date}`,
    );
    return response;
};
