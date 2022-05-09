import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {useKppStore} from '@store/kpp';

import {getKppById} from './index';

const useKpp = (routeId: number) => {
    const {setKppById} = useKppStore((state) => ({...state}), shallow);

    const {data, isLoading} = useQuery(
        ['kpp', routeId],
        () => getKppById(routeId),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            onSuccess: (data) => {
                console.log('useKpp', data.data);
                setKppById(data.data.data);
            },
        },
    );

    return {
        kpps: data?.data?.data,
        kpploading: isLoading,
    };
};

export default useKpp;
