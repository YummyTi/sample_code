import {useQuery} from 'react-query';

import {IRouteType} from '@src/shared/models/route_type';

import {getRouteType} from '.';

export const useRouteType = () => {
    const {data, isLoading} = useQuery(['passportData'], () => getRouteType(), {
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const routeType: IRouteType[] = data?.data;

    return {routeType, isLoading};
};
