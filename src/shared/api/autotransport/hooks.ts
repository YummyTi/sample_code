import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import useDebounce from '@shared/hooks/useDebounce';
import {useAutoTransStore} from '@shared/store/autotransport';

import {getAutoTrans} from './index';

const useAutoTransport = () => {
    const {setAutoTrans, page, searchTerm, refetchCount, filters} =
        useAutoTransStore((state) => ({...state}), shallow);

    const key = filters.filter((item) => item.isChecked);

    const searchText = useDebounce(searchTerm, 600);

    const {isLoading, isError, refetch, isFetching} = useQuery(
        ['autoTransList', page, searchText, refetchCount],
        () =>
            getAutoTrans({
                page,
                size: 10,
                searchText,
                key: key[0]?.label ? key[0].label : 'park_name',
            }),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            onSuccess: (data) => {
                setAutoTrans(data.data.data);
            },
        },
    );

    return {isLoading, isError, refetch, isFetching};
};

export default useAutoTransport;
