import * as yup from 'yup';

import {confirmError, handleMinimal, requireText} from '@src/shared/constants';
import i18n from '@src/shared/localization/i18n';

export interface UsersProps {
    name: string;
    login: string;
    password: string;
    confirmPassword: string;
    region: any;
    automobile: any;
    active: boolean;
    roleId: any;
}

export interface UsersUpdateProps {
    id: number | string | null;
    fullname: string;
    login: string;
    password: string | number;
    confirmPassword: string | number;
    roleId: number;
    parkList: number[] | any;
    regionId: number;
    remark: string;
    isActivated: string | boolean;
}

export const usersScheme = yup.object().shape({
    name: yup.string().trim().required(requireText),
    login: yup.string().min(8, handleMinimal(8)).trim().required(requireText),
    password: yup
        .string()
        .trim()
        .required(requireText)
        .min(8, handleMinimal(8)),
    confirmPassword: yup
        .string()
        .trim()
        .required(requireText)
        .oneOf([yup.ref('password')], confirmError)
        .min(8, handleMinimal(8)),
    automobile: yup.array().of(
        yup.object().shape({
            value: yup.string().required(requireText),
            label: yup.string().required(requireText),
        }),
    ),
    region: yup.object().shape({
        value: yup.string().required(requireText),
        label: yup.string().required(requireText),
    }),
    roleId: yup.object().shape({
        value: yup.string().required(requireText),
        label: yup.string().required(requireText),
    }),
    // active: yup.boolean().required(requireText),
});
