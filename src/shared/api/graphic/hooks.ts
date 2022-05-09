import dayjs from 'dayjs';
import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import useDebounce from '@shared/hooks/useDebounce';
import {useOrderStore} from '@store/order';

import {getGraphById} from './index';

const useGraphicById = () => {
    const {routeId, graphId, setGraphic, date} = useOrderStore(
        (state) => ({...state}),
        shallow,
    );
    const id = useDebounce(graphId.toString(), 500);

    const {isLoading} = useQuery(
        ['graphic', id, routeId],
        () =>
            getGraphById({
                id,
                routeId,
                date: dayjs(date).format('YYYY-MM-DD'),
            }),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            enabled: graphId !== 0,
            onSuccess: (data) => {
                console.log(data.data?.data, 'data graphic');
                if (data?.data?.data?.length) {
                    setGraphic(
                        data?.data?.data?.map((item: any, index: number) => ({
                            ...item,
                            id: index + 1,
                        })),
                    );
                }
            },
        },
    );

    return {
        isLoading,
    };
};

export default useGraphicById;
