import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {useScheduleStore} from '@src/shared/store/schedule';

import {getList} from './index';

const useSchedule = (route_id: number) => {
    const {
        shPage: page,
        setShTotalCount,
        setNewData,
        stepSave,
    } = useScheduleStore((state) => ({...state}), shallow);

    const {isLoading} = useQuery(
        ['schedule', route_id, page, stepSave],
        () => getList({route_id: route_id, page}),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            enabled: !!route_id,
            onSuccess: (data) => {
                const dataList = data.data.data;
                if (dataList.list) {
                    const list: any[] = [];
                    setShTotalCount(dataList.totalCount);

                    // eslint-disable-next-line prefer-const
                    let id = 0;
                    dataList.list.forEach((obj: any, index: number) => {
                        if (obj.scheduleItems?.length > 0) {
                            id += 1;
                            obj.scheduleItems.forEach((movie: any) => {
                                list.push({
                                    ...movie,
                                    id: id,
                                    schedule_id: obj.scheduleId,
                                    uniqeId: movie.id,
                                });
                            });
                        }
                    });

                    setNewData(list);
                }
            },
        },
    );

    return {
        isLoading,
    };
};

export default useSchedule;
