import {useQuery} from 'react-query';

import {usersParkList} from './index';

const userParkHook = (id: string | number) => {
    const {isLoading, data, isFetching} = useQuery(
        ['usersPark', id],
        () => usersParkList(id),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            enabled: !!id,
            onSuccess: (data) => {
                console.log(data.data, 'data users park list');
            },
        },
    );

    const loading = isLoading || isFetching;

    return {
        data: data?.data?.data,
        loading,
    };
};

export default userParkHook;
