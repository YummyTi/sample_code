import apiReq from '@src/shared/api/interceptor';
import {ScheduleModel} from '@src/shared/models/schedule_model';

interface IProps {
    page?: number;
    size?: number;
    route_id: number;
}

export const getList = async ({page = 1, size = 10, route_id}: IProps) => {
    const response = await apiReq.get(
        `manage/schedule/list?page=${page}&size=${size}&route_id=${route_id}`,
    );
    return response;
};

export const saveShedule = async (payload: ScheduleModel) => {
    const response = await apiReq.post('manage/schedule/save', payload);
    return response;
};

export const deleteSchedule = async (ids: number[] | string[]) => {
    const response = await apiReq.post('manage/schedule/delete', {
        ids: ids,
    });

    return response;
};
