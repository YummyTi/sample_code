import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {useStationsStore} from '@src/shared/store/station';

import {getStations} from './index';

const useStations = (routeId: number) => {
    const {setStations} = useStationsStore((state) => ({...state}), shallow);

    const {isLoading} = useQuery(
        ['stationList', routeId],
        () => getStations({routeId: routeId}),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            enabled: routeId !== null,
            onSuccess: (data) => {
                setStations(data.data.data);
            },
        },
    );

    return {
        isLoading,
    };
};

export default useStations;
