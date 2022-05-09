import {useQuery} from 'react-query';
import {v4 as uuid} from 'uuid';
import shallow from 'zustand/shallow';

import {useStationsStore} from '@src/shared/store/station';

import {getPointById} from './index';

const usePoints = (id: any) => {
    const {setCoords, setPolyLines} = useStationsStore(
        (state) => ({...state}),
        shallow,
    );

    const {isLoading} = useQuery(['routeById', id], () => getPointById(id), {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5000,
        onSuccess: (data) => {
            console.log(data.data, 'points data');
            setCoords(
                data.data.data.map((item: any) => ({
                    ...item,
                    uniqeId: uuid(),
                })),
            );
            setPolyLines(
                data.data.data.map((item: any) => [item.lat, item.lng]),
            );
        },
    });

    return {
        isLoading,
    };
};

export default usePoints;
