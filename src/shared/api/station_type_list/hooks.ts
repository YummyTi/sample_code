import {useQuery} from 'react-query';

import {getStationTypeList} from './index';

export const useStationType = () => {
    const {data, isLoading} = useQuery(
        ['stationTypeList'],
        () => getStationTypeList(),
        {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    );

    return {
        stationTypeList: data?.data?.data,
        isLoading,
    };
};
