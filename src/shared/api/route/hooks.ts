import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import useDebounce from '@shared/hooks/useDebounce';
import {useRouteStore} from '@shared/store/route';

import {getRouteP} from './index';

const useVRoutes = () => {
    const {setTotal, page, setRoutes, text} = useRouteStore(
        (state) => ({...state}),
        shallow,
    );

    const debounceText = useDebounce(text, 500);

    const {isLoading: isPLoading, data} = useQuery(
        ['routesP', page, debounceText],
        () => getRouteP(page, debounceText),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            onSuccess: (data) => {
                setRoutes(data.data.data.list);
                setTotal(data.data.data.totalCount);
            },
        },
    );

    const routeList = data?.data.data.list;

    return {
        // isLoading,
        isPLoading,
        routeList,
    };
};

export default useVRoutes;
