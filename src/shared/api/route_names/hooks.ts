import {useQuery} from 'react-query';

import {getRouteNames} from './index';

export const useRouteNames = () => {
    const {data, isLoading} = useQuery(['routeNames'], () => getRouteNames(), {
        refetchOnWindowFocus: false,
        retry: 1,
    });

    return {
        routeNames: data?.data?.data,
        isLoading,
    };
};
