import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {useKppStore} from '@src/shared/store/kpp';

import {getKpps} from './index';

export const useGetAllKpps = () => {
    const {setKpps} = useKppStore((state) => ({...state}), shallow);

    const {data, isLoading} = useQuery(['getKpps'], () => getKpps(), {
        refetchOnWindowFocus: false,
        retry: 1,
        onSuccess: (data) => {
            setKpps(data.data?.data);
        },
    });

    return {
        kppsData: data?.data?.data,
        getKppsLoading: isLoading,
    };
};
