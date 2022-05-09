import {useQuery} from 'react-query';

import {useGaragesStore} from '@src/shared/store/garages';

import {getGarages} from './index';

const useGarages = () => {
    const setGarages = useGaragesStore((state) => state.setGarages);

    const {isLoading} = useQuery(['garages'], getGarages, {
        refetchOnWindowFocus: false,
        retry: 1,
        onSuccess: (data) => {
            setGarages(data.data.data);
        },
    });

    return {
        isLoading,
    };
};

export default useGarages;
