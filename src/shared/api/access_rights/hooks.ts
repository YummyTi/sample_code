import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import useDebounce from '@shared/hooks/useDebounce';
import {useAccessStore} from '@shared/store/access_rights';

import {getUsers} from './index';

const useUsersData = () => {
    const {
        setUsersList,
        page,
        status,
        searchTerm,
        setTotalCountUsers,
        refetchCount,
    } = useAccessStore((state) => ({...state}), shallow);

    const searchText = useDebounce(searchTerm, 600);

    const {isLoading, isError, refetch, isFetching} = useQuery(
        ['users_list', page, status, searchText, refetchCount],
        () => getUsers({page, size: 10, status, searchText}),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            keepPreviousData: true,
            onSuccess: (data) => {
                const users = data.data.data.list;
                const totalCountUser = data.data.data.totalCount;
                setUsersList(users);
                setTotalCountUsers(totalCountUser);
            },
        },
    );

    return {
        isLoading,
        isError,
        refetch,
        isFetching,
    };
};

export default useUsersData;
