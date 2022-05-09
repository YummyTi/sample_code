import {useQuery} from 'react-query';
import {useLocation} from 'react-router-dom';

import useDebounce from '@shared/hooks/useDebounce';
import {useParkStore} from '@shared/store/park';

import {getParks} from './index';

const usePark = () => {
    const location = useLocation();
    const setParks = useParkStore((state) => state.setParks);
    const page = useParkStore((state) => state.page);
    const term = useParkStore((state) => state.term);
    const setParkTotal = useParkStore((state) => state.setParkTotal);

    const searchTerm = useDebounce(term, 600);
    const params =
        location.pathname === '/manage/automobile'
            ? `page=${page}&size=10`
            : '';

    const {isLoading, data, isFetching} = useQuery(
        ['parkList', page, searchTerm],
        () => getParks(params, searchTerm),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            onSuccess: (data) => {
                // console.log(data.data.data.entityList, 'data park list');
                const dataList = data.data.data;
                if (dataList?.entityList) {
                    setParks(data.data.data.entityList);
                    setParkTotal(data.data.data.totalCount);
                } else {
                    setParks(dataList);
                    setParkTotal(dataList.length);
                }
            },
        },
    );

    const parkData = data?.data?.data;

    return {isLoading, parkData, term, isFetching};
};

export default usePark;
