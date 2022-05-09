import * as yup from 'yup';

import {requireText} from '@src/shared/constants';

export type AutoFormProps = {
    license_name: string;
    short_name: string;
    license_number: string;
    license_expire_date: string;
    remark: string;
    region_id: any;
    garages?: any[];
};

export interface IGarageModel {
    garage_name: string;
    lat: number;
    lng: number;
    radius: number;
    garage_remark: string;
}

export interface IGarage {
    garage_list: IGarageModel[];
}

export const automobileScheme = yup.object().shape({
    license_name: yup.string().trim().required(requireText),
    short_name: yup.string().trim().required(requireText),
    license_number: yup.string().trim().required(requireText),
    remark: yup.string().trim().required(requireText),
    region_id: yup.object().shape({
        value: yup.string().required(requireText),
        label: yup.string().required(requireText),
    }),
    // garages: yup.array().of(yup.string().required(requireText)),
    // active: yup.boolean().required(requireText),
});
