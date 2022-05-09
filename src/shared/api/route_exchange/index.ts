import apiReq from '@src/shared/api/interceptor';
import {OrderSaveModel} from '@src/shared/models/order_model';

export const getExGarages = async (id: number | string | false) => {
    const res = await apiReq.get(
        `manage/route_exch/getExGarages?park_id=${id}`,
    );
    return res;
};

export const getByRoute = async (id: number) => {
    const response = await apiReq.get(
        `manage/route_exch/getByRoute?route_id=${id}`,
    );
    return response;
};

export const saveOrder = async (data: OrderSaveModel) => {
    const response = await apiReq.post(`manage/route_exch/save`, {
        ...data,
    });

    return response;
};

export const deleteOrder = async ({
    ex_id,
}: {
    ex_id: number | null | undefined;
}) => {
    const response = await apiReq.post(
        `manage/route_exch/delete?ex_id=${ex_id}`,
    );
    return response;
};
