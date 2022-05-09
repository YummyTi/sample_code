import {useQuery} from 'react-query';

import {useDiffNormStore} from '@store/race_fuel';

import {getCoeflist, getDiffNormData} from './index';

export const useDiffNormQuery = () => {
    const park_id = useDiffNormStore((state) => state.park_id);

    return useQuery(['diff_norm', park_id], () => getDiffNormData(park_id), {
        refetchOnWindowFocus: false,
        retry: 1,
    });
};

export const useCoefList = () => {
    const setCoefList = useDiffNormStore((state) => state.setCoefList);

    return useQuery(['coef_list'], getCoeflist, {
        refetchOnWindowFocus: false,
        retry: 1,
        onSuccess: (data) => {
            setCoefList(data);
        },
    });
};
