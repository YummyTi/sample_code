import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import useDebounce from '@shared/hooks/useDebounce';
import {useRouteStore} from '@shared/store/route';

import {getRouteSearch} from './index';

const useRouteSearch = () => {
    const {text, setRoutes} = useRouteStore((state) => ({...state}), shallow);

    const debounceText = useDebounce(text, 500);

    const {isFetching} = useQuery(
        ['routeSearch', debounceText],
        () => getRouteSearch(debounceText),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            enabled: debounceText.trim().length > 0,
            onSuccess: (data) => {
                setRoutes(data.data.data);
            },
        },
    );

    return {
        isFetching,
    };
};

export default useRouteSearch;
