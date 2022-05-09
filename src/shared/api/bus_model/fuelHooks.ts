import {useQuery} from 'react-query';

import {useBusModelStore} from '@src/shared/store/bus_model';

import {getFuelTypeList} from './index';

const useFuelTypeList = () => {
    const setFueltType = useBusModelStore((state) => state.setFuelTypeList);
    const {isLoading, data} = useQuery(['fuelt_type_list'], getFuelTypeList, {
        refetchOnWindowFocus: false,
        retry: 1,
        onSuccess: (data) => {
            setFueltType(data.data.data);
        },
    });

    return {
        isLoading,
        data: data?.data.data,
    };
};

export default useFuelTypeList;
