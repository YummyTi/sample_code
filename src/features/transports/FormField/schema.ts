import * as yup from 'yup';

export interface AutoTransSaveProps {
    gos_number: string;
    garage_number: string;
    region_id: any;
    parkId: string;
    model_id: number;
    made_date: string;
    tracker_imei: string;
    sim_number: string;
    insurance_number: string;
    insurance_expire_date: string;
    license_number: string;
    license_expire_date: string;
    tex_number: string;
    tex_expire_date: string;
    remark: string;
}

const requireText = 'Поля обязательны к заполнению';

export const autoTransScheme = yup.object().shape({
    gos_number: yup.string().trim().required(requireText),
    garage_number: yup.string().trim().required(requireText),
    region_id: yup.object().shape({
        label: yup.string().required(requireText),
    }),
    parkId: yup.string().trim().required(requireText),
    model_id: yup.string().trim().required(requireText),
    made_date: yup.string().trim().required(requireText),
    tracker_imei: yup.string().trim().required(requireText),
    sim_number: yup.string().trim().required(requireText),
    insurance_number: yup.string().trim().required(requireText),
    license_number: yup.string().trim().required(requireText),
    tex_number: yup.string().trim().required(requireText),
    remark: yup.string().trim().required(requireText),
});
