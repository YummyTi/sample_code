import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {IBusModelJSON} from '@models/bus_model';
import useDebounce from '@shared/hooks/useDebounce';
import {useBusModelStore} from '@store/bus_model';

import {getAllBusModels, getBusModels} from './index';

const useBusModels = () => {
    const {setBusModelsList, page, term, setTotalBusModelCount, refetch} =
        useBusModelStore((state) => state, shallow);

    const params = `?page=${page}&size=10`;

    const searchTerm = useDebounce(term, 600);

    const {isLoading, data} = useQuery(
        ['busModels', page, searchTerm, refetch],
        () => getBusModels(params),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            keepPreviousData: true,
            onSuccess: (data) => {
                const list = data.data.data.list;
                if (list || list === null) {
                    setBusModelsList(list);
                } else {
                    setBusModelsList(data.data.data);
                }
                setTotalBusModelCount(data.data.data?.totalCount);
            },
        },
    );

    const busModelData: IBusModelJSON[] = data?.data?.data?.list;

    return {isLoading, busModelData, term};
};

export default useBusModels;

export const useAllBusModel = () => useQuery('allBusModels', getAllBusModels);
