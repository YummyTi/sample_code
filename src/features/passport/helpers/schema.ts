import * as yup from 'yup';

import {requireText} from '@shared/constants';

const option = yup.object().shape({
    label: yup.string().required(requireText),
});

export const passportSchema = yup.object().shape({
    route_name: option,
    park: option,
    route_type: option,
    kpp1: option,
    kpp2: option,
    distkpp1kpp2: yup.string().trim().required(requireText),
    distkpp2kpp1: yup.string().trim().required(requireText),
    distparkkpp1: yup.string().trim().required(requireText),
    distparkkpp2: yup.string().trim().required(requireText),
    vremyakpp1kpp2: yup.string().trim().required(requireText),
    vremyakpp2kpp1: yup.string().trim().required(requireText),
    // vremyadokpp1: yup.string().nullable().required(requireText),
    // vremyadokpp2: yup.string().nullable().required(requireText),
    prostoykpp1: yup.string().trim().required(requireText),
    prostoykpp2: yup.string().trim().required(requireText),
    utrenniypikbegin: yup.string().trim().required(requireText),
    utrenniypikend: yup.string().trim().required(requireText),
    vecherniypikbegin: yup.string().trim().required(requireText),
    vecherniypikend: yup.string().trim().required(requireText),
    remark: yup.string().trim().required(requireText),
});
