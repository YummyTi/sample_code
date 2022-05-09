import {useQuery} from 'react-query';

import {useRegionStore} from '@src/shared/store/region';

import {getRegions} from './index';

const useRegion = () => {
    const setRegions = useRegionStore((state) => state.setRegions);

    const {data, isLoading} = useQuery('regionList', getRegions, {
        refetchOnWindowFocus: false,
        retry: 1,
        onSuccess: (data) => {
            setRegions(data.data.data);
        },
    });

    return {regionList: data?.data?.data, isLoading};
};

export default useRegion;
