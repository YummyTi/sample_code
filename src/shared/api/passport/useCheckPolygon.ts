import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {usePolygonStore} from '@store/polygon';

import {checkPolygon} from './index';

const useCheckPolygon = (stationId: number | string, kpp: 'kpp1' | 'kpp2') => {
    const {setStatKpp} = usePolygonStore((state) => ({...state}), shallow);
    const {data, isLoading} = useQuery(
        ['checkPolygon', stationId],
        () => checkPolygon(stationId),
        {
            enabled: !!stationId,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                const {statusCode} = data.data;
                if (kpp === 'kpp1') {
                    console.log(data.data, 'data kpp1');
                    if (statusCode === 25) {
                        setStatKpp(false, 'kpp1');
                    } else {
                        setStatKpp(true, 'kpp1');
                    }
                } else {
                    console.log(data.data, 'data kpp2');
                    if (statusCode === 25) {
                        setStatKpp(false, 'kpp2');
                    } else {
                        setStatKpp(true, 'kpp2');
                    }
                }
            },
        },
    );

    return {
        data,
        isLoading,
    };
};

export default useCheckPolygon;
