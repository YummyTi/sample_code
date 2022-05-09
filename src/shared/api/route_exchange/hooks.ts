import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {RouteExchangeOrder} from '@src/shared/models/route_exchange_model';
import {useOrderStore} from '@src/shared/store/order';

import {getExGarages} from './index';

const useExRouteExchange = () => {
    const {expanded, setOrderGarages, refetch} = useOrderStore(
        (state) => ({...state}),
        shallow,
    );

    const {isLoading, data} = useQuery(
        ['exRouteChange', expanded, refetch],
        () => getExGarages(expanded),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            enabled: !!expanded || refetch > 0,
            onSuccess: (data) => {
                setOrderGarages(data?.data?.data);
            },
        },
    );

    const dataRoutes: RouteExchangeOrder[] = data?.data?.data;

    return {isLoading, dataRoutes};
};

export default useExRouteExchange;
