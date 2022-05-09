import * as yup from 'yup';

import {requireText} from '@src/shared/constants';

export interface FuelProps {
    name: string;
    remark: string;
}

export const fuelsScheme = yup.object().shape({
    name: yup.string().trim().required(requireText),
    remark: yup.string().trim().required(requireText),
    // active: yup.boolean().required(requireText),
});
