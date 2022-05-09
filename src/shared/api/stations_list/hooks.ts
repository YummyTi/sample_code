import {useQuery} from 'react-query';

import {NameIdArrType} from '@models/name_id_arr_type';
import useDebounce from '@shared/hooks/useDebounce';
import {useStationsListStore} from '@store/stations_list';

import {getSearchedStations, getStationsList} from './index';

export const useStations = () => {
    const setStationsList = useStationsListStore((s) => s.setStationsList);

    const {isLoading} = useQuery(['stationList'], () => getStationsList(), {
        refetchOnWindowFocus: false,
        retry: 1,
        onSuccess: (data) => {
            setStationsList(data?.data?.data);
        },
    });

    return isLoading;
};

export const useSearchedData = (searchTerm: string, text: string) => {
    const searchValue = useDebounce(text, 500);

    const {data, isLoading} = useQuery(
        ['search_station', searchValue, searchTerm],
        () => getSearchedStations(searchTerm, searchValue),
        {
            enabled: !!text,
            refetchOnWindowFocus: false,
            retry: 1,
        },
    );

    const searchedData: NameIdArrType = data?.data?.data;

    return {searchedData, isLoading};
};
