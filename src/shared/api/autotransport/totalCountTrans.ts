import {useQuery} from 'react-query';

import {useAutoTransStore} from '@src/shared/store/autotransport';

import {getTotalAutoTrans} from './index';

const useTotalCountTrans = () => {
    const setTotalCountTrans = useAutoTransStore(
        (state) => state.setTotalCountTrans,
    );

    const {isLoading} = useQuery(
        ['autoTransTotal'],
        () => getTotalAutoTrans(),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            keepPreviousData: true,
            onSuccess: (data) => setTotalCountTrans(data.data.data.count),
        },
    );

    return {
        isLoading,
    };
};

export default useTotalCountTrans;
