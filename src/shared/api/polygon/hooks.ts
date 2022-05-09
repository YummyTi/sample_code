import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import useDebounce from '@shared/hooks/useDebounce';
import {usePolygonStore} from '@shared/store/polygon';

import {getPolygons} from './index';

export type IParams = {
    page: number;
    pageSize: number;
};

const usePolygon = () => {
    const {page, setPolygons, setTotalCount, routeName, refetch} =
        usePolygonStore((state) => ({...state}), shallow);
    const name = useDebounce(routeName, 500);

    const params: IParams = {
        page: page,
        pageSize: 10,
    };

    const {isLoading, isFetching} = useQuery(
        ['polygons', page, name, refetch],
        () => getPolygons(params),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            onSuccess: (data) => {
                const {list, totalCount} = data?.data?.data;
                if (list.length) {
                    setPolygons(list);
                    setTotalCount(totalCount);
                }
            },
        },
    );

    return {
        isLoading,
        isFetching,
    };
};

export default usePolygon;
