import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import useDebounce from '@shared/hooks/useDebounce';
import {IPolygonModel} from '@shared/models/polygon_model';
import {usePolygonStore} from '@shared/store/polygon';

import {getByRouteName} from './index';

const usePolygonSearch = () => {
    const {routeName, routeType} = usePolygonStore(
        (state) => ({...state}),
        shallow,
    );
    const name = useDebounce(routeName, 500);

    const {isLoading, data} = useQuery(
        ['plygonSearch', name, routeType],
        () => getByRouteName(name, routeType),
        {
            retry: 1,
            refetchOnWindowFocus: false,
            enabled: name !== '',
            onSuccess: (data) => {
                console.log(data.data.data, 'search by route');
            },
        },
    );

    const list: IPolygonModel[] = data?.data?.data;

    return {
        isLoading,
        list,
    };
};

export default usePolygonSearch;
