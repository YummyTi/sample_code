import apiReq from '@api/interceptor';
import {IDelete} from '@models/delete_model';
import {CoefModel, DiffNormData} from '@models/diff_norm_models';
import {CoefSave, DiffNormSave, ModelSave} from '@models/diff_norm_save_models';

export const getDiffNormData = async (
    park_id: number,
): Promise<DiffNormData[]> => {
    const response = await apiReq.get(
        `manage/diffnorm/list?park_id=${park_id}`,
    );
    return response?.data?.data;
};

export const getCoeflist = async (): Promise<CoefModel[]> => {
    const response = await apiReq.get(`manage/diffnorm/coef/list`);
    return response?.data?.data;
};

export const saveDiffNorm = async (data: DiffNormSave) => {
    const response = await apiReq.post(`manage/diffnorm/save`, data);
    return response;
};

export const saveModels = async (data: ModelSave) => {
    const response = await apiReq.post(`manage/diffnorm/saveModels`, data);
    return response;
};

export const saveCoef = async (data: CoefSave) => {
    const response = await apiReq.post(`manage/diffnorm/coef/save`, data);
    return response;
};

export const deleteCoef = async (data: IDelete) => {
    const response = await apiReq.post(`manage/diffnorm/coef/delete`, data);
    return response;
};

export const applyCoef = async (id: number) => {
    const response = await apiReq.post(
        `manage/diffnorm/coef/apply?coef_id=${id}`,
    );
    return response;
};
