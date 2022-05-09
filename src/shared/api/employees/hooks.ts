import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {useEmployeeStore} from '@src/shared/store/employee';

import {getEmployees} from './index';

const useEmployees = () => {
    const {setEmployees} = useEmployeeStore((state) => ({...state}), shallow);
    const {isLoading} = useQuery(['employees'], () => getEmployees(), {
        refetchOnWindowFocus: false,
        retry: 1,
        onSuccess: (data) => {
            setEmployees(data?.data?.data);
        },
    });

    return {
        isLoading,
    };
};

export default useEmployees;
