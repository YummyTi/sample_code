import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {RouteExchangeModel} from '@src/shared/models/route_exchange_model';
import {useOrderStore} from '@src/shared/store/order';

import {getByRoute} from './index';

const useByRoute = () => {
    const {routeId, fetchCount, setOrders} = useOrderStore(
        (state) => ({...state}),
        shallow,
    );

    const {isLoading, isFetching, data} = useQuery(
        ['ordersCardDataRtx', routeId, fetchCount],
        () => getByRoute(routeId),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            enabled: !!routeId,
            onSuccess: (data) => {
                setOrders(data?.data?.data);
            },
        },
    );

    const cardDatas: RouteExchangeModel[] = data?.data?.data;

    return {
        isLoading,
        isFetching,
        cardDatas,
    };
};

export default useByRoute;
