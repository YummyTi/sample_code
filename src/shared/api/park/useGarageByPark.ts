import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {useAutomobileStore} from '@store/automobile';
import {useParkStore} from '@store/park';

import {getGarageByPark} from './index';

const useGarageByPark = () => {
    const {selectedPark, setGaragePark} = useParkStore(
        (state) => ({...state}),
        shallow,
    );

    const {setNewPolygons} = useAutomobileStore(
        (state) => ({...state}),
        shallow,
    );

    const parkId = selectedPark[0]?.park_id;
    const {isLoading} = useQuery(
        ['garageByPark', parkId],
        () => getGarageByPark(parkId),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            enabled: !!parkId,
            onSuccess: (data) => {
                const coordsLength = data.data.data?.length;
                setGaragePark(data.data.data);
                console.log(coordsLength, data.data.data, 'coordsLength');

                console.log(
                    data.data.data.map((item: any) =>
                        item?.coords.map((item: any) => item),
                    ),
                    'log something',
                );
                setNewPolygons(
                    data.data.data.map((item: any) =>
                        item?.coords.map((item: any) => item),
                    ),
                );
            },
        },
    );

    return {
        isLoading,
    };
};

export default useGarageByPark;
