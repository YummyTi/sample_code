import {useQuery} from 'react-query';

import {useParkStore} from '@src/shared/store/park';

import {getTotalPark} from './index';

const useTotalPark = () => {
    const setParkTotal = useParkStore((state) => state.setParkTotal);

    const {isLoading} = useQuery(['parkListTotal'], () => getTotalPark(), {
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: false,
        keepPreviousData: true,
        onSuccess: (data) => {
            setParkTotal(data.data.data.count);
        },
    });

    return {
        isLoading,
    };
};

export default useTotalPark;
