import {useMutation} from 'react-query';
import shallow from 'zustand/shallow';

import {ScheduleModel} from '@src/shared/models/schedule_model';
import {useScheduleStore} from '@src/shared/store/schedule';

import {deleteSchedule, saveShedule} from './index';

const useScheduleMutate = () => {
    const {stepSave, setStepSave, setStep, setOpenM} = useScheduleStore(
        (state) => ({...state}),
        shallow,
    );

    const refetchFunction = () => {
        setStep(0);
        setOpenM(false);
        setStepSave(stepSave + 1);
    };

    const handleAddSchedule = useMutation(
        (data: ScheduleModel) => saveShedule(data),
        {
            onSuccess: (data) => {
                console.log(data, 'Save success Schedule data');
                refetchFunction();
            },
        },
    );

    const deleteSchedules = useMutation(
        (data: number[] | string[]) => deleteSchedule(data),
        {
            onSuccess: (data) => {
                console.log(data.data, 'Delete success Schedule data');
                refetchFunction();
            },
        },
    );

    return {
        handleAddSchedule,
        deleteSchedules,
    };
};

export default useScheduleMutate;
