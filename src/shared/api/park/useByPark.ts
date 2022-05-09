import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {useOrderStore} from '@src/shared/store/order';

import {getByPark} from './index';

interface IRoute {
    route_name: string;
    route_id: number;
}

const useByPark = () => {
    const {expanded} = useOrderStore((state) => ({...state}), shallow);

    const {isLoading, data, isFetching} = useQuery(
        ['getByPark', expanded],
        () => getByPark(expanded),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            enabled: !!expanded,
            onSuccess: (data) => {
                console.log(data);
            },
        },
    );

    const dataRoutes: IRoute[] = data?.data?.data;

    return {
        isLoading,
        dataRoutes,
        isFetching,
    };
};

export default useByPark;
