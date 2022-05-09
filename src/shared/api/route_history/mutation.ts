import {useMutation} from 'react-query';

import {getHistory} from './index';

const useRouteHistory = () => {
    const {isLoading, data, mutate} = useMutation((entityName: string) =>
        getHistory(entityName),
    );

    return {
        isLoading,
        data,
        mutate,
    };
};

export default useRouteHistory;
