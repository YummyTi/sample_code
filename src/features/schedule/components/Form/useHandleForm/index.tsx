import {useLocation} from 'react-router-dom';
import shallow from 'zustand/shallow';

import useScheduleMutate from '@api/schedule/mutations';
import {
    FormProps,
    LocationState,
} from '@features/schedule/components/Form/schema';
import {helper} from '@shared/helpers';
import {useScheduleStore} from '@store/schedule';

import {parseHour} from '../helper';

const {handleDay, handleSecondDay} = helper;

const useHandleForm = () => {
    const location = useLocation();
    const {handleAddSchedule, deleteSchedules} = useScheduleMutate();

    const {step, setStep, id, setStepData, stepData, updateStepData, update} =
        useScheduleStore((state) => ({...state}), shallow);

    const {state} = location as LocationState;

    const handleUpdate = (data: FormProps) => {
        if (!update) {
            setStepData({
                id: id,
                race: +data.race_count,
                exit: data.garage_begin_time,
                busStop: data.kpp_begin.value.toString(),
                kpp1: data.kpp_begin,
                comeback: data.garage_end_time,
                day: handleDay(step),
                busStopEnd: data.kpp_end.value.toString(),
                kpp2: data.kpp_end,
                time: data.kpp_begin_time,
                timeEnd: data.kpp_end_time,
                simple: data.prostoy.toString(),
                interval: data.interval.toString(),
                lunchFrom: data.lunch1_begin,
                lunchTo: data.lunch1_end,
                busLunchStop: data.kpp_lunch1.value.toString(),
                kpp1Lunch: data.kpp_lunch1,
                kpp2Lunch: data.kpp_lunch2,
                dinnerFrom: data.lunch2_begin,
                dinnerhTo: data.lunch2_end,
                busDinnerStop: data.kpp_lunch2.value.toString(),
            });
        } else {
            if (step === 0) {
                updateStepData([
                    {
                        ...stepData[step],
                        id: id,
                        race: +data.race_count,
                        exit: data.garage_begin_time,
                        busStop: data.kpp_begin.value.toString(),
                        comeback: data.garage_end_time,
                        day: handleDay(step),
                        busStopEnd: data.kpp_end.value.toString(),
                        time: data.kpp_begin_time,
                        timeEnd: data.kpp_end_time,
                        simple: data.prostoy.toString(),
                        interval: data.interval.toString(),
                        lunchFrom: data.lunch1_begin,
                        lunchTo: data.lunch1_end,
                        busLunchStop: data.kpp_lunch1.value.toString(),
                        dinnerFrom: data.lunch2_begin,
                        dinnerhTo: data.lunch2_end,
                        busDinnerStop: data.kpp_lunch2.value.toString(),
                        kpp1: data.kpp_begin,
                        kpp2: data.kpp_end,
                        kpp1Lunch: data.kpp_lunch1,
                        kpp2Lunch: data.kpp_lunch2,
                    },
                    ...stepData.slice(step + 1),
                ]);
            } else {
                updateStepData([
                    ...stepData.slice(0, step),
                    {
                        ...stepData[step],
                        id: id,
                        race: +data.race_count,
                        exit: data.garage_begin_time,
                        busStop: data.kpp_begin.value.toString(),
                        comeback: data.garage_end_time,
                        day: handleDay(step),
                        busStopEnd: data.kpp_end.value.toString(),
                        time: data.kpp_begin_time,
                        timeEnd: data.kpp_end_time,
                        simple: data.prostoy.toString(),
                        interval: data.interval.toString(),
                        lunchFrom: data.lunch1_begin,
                        lunchTo: data.lunch1_end,
                        busLunchStop: data.kpp_lunch1.value.toString(),
                        dinnerFrom: data.lunch2_begin,
                        dinnerhTo: data.lunch2_end,
                        busDinnerStop: data.kpp_lunch2.value.toString(),
                        kpp1: data.kpp_begin,
                        kpp2: data.kpp_end,
                        kpp1Lunch: data.kpp_lunch1,
                        kpp2Lunch: data.kpp_lunch2,
                    },
                    ...stepData.slice(step + 1),
                ]);
            }
        }
    };

    const handleSave = (data: FormProps) => {
        console.log(stepData, 'step Data');

        if (step === 3) {
            handleAddSchedule.mutate({
                id: update ? stepData[0]?.schedule_id : null,
                route_id: state.routeId,
                schedule_items: update
                    ? [
                          ...stepData
                              .slice(0, 3)
                              .map((item: any, index: number) => {
                                  console.log(
                                      item,
                                      item.kpp_begin_time,
                                      'item itarating',
                                  );
                                  return {
                                      id: update ? item?.uniqeId : null,
                                      day_type: handleSecondDay(index),
                                      race_count: +item.race,
                                      garage_begin_time: parseHour(
                                          item.garageBeginTime,
                                      ),
                                      garage_end_time: parseHour(
                                          item.garageEndTime,
                                      ),
                                      kpp_begin_time: parseHour(item.time),
                                      kpp_end_time: parseHour(item.timeEnd),
                                      kpp_begin: item.kpp1?.value,
                                      kpp_end: item.kpp2?.value,
                                      prostoy: +item.prostoy,
                                      interval: +item.interval,
                                      lunch1_begin: item.lunchFrom,
                                      lunch1_end: item.lunchTo,
                                      kpp_lunch1: item.kpp1Lunch.value,
                                      lunch2_begin: item.dinnerFrom,
                                      lunch2_end: item.dinnerhTo,
                                      kpp_lunch2: item.kpp2Lunch.value,
                                  };
                              }),
                          {
                              ...data,
                              kpp_begin_time: parseHour(data.kpp_begin_time),
                              id: update ? stepData[3]?.uniqeId : null,
                              day_type: handleSecondDay(3),
                              race_count: +data.race_count,
                              kpp_begin: data.kpp_begin.value,
                              kpp_end: data.kpp_end.value,
                              kpp_lunch1: data.kpp_lunch1.value,
                              kpp_lunch2: data.kpp_lunch2.value,
                          },
                      ]
                    : [
                          ...stepData.map((item: any, index: number) => ({
                              id: null,
                              day_type: handleSecondDay(index),
                              race_count: +item.race,
                              garage_begin_time: item.exit,
                              garage_end_time: item.comeback,
                              kpp_begin_time: item.time,
                              kpp_end_time: item.timeEnd,
                              kpp_begin: item.busStop,
                              kpp_end: item.busStopEnd,
                              prostoy: item.simple?.toString(),
                              interval: item.interval?.toString(),
                              lunch1_begin: item.lunchFrom,
                              lunch1_end: item.lunchTo,
                              kpp_lunch1: item.busLunchStop,
                              lunch2_begin: item.dinnerFrom,
                              lunch2_end: item.dinnerhTo,
                              kpp_lunch2: item.busDinnerStop,
                          })),
                          {
                              ...data,
                              id: null,
                              day_type: handleSecondDay(3),
                              race_count: +data.race_count,
                              kpp_begin: data.kpp_begin.value,
                              kpp_end: data.kpp_end.value,
                              kpp_lunch1: data.kpp_lunch1.value,
                              kpp_lunch2: data.kpp_lunch2.value,
                          },
                      ],
            });

            // saveRow(data);
        } else {
            setStep(step + 1);
            handleUpdate(data);
        }
    };

    const handleDelete = ({id}: {id: number}) => {
        deleteSchedules.mutate([id]);
    };

    return {
        handleSave,
        handleAddSchedule,
        handleDelete,
        deleteSchedules,
    };
};

export default useHandleForm;

// const saveRow = (data: FormProps) => {
//     setNewData([
//         ...newData,
//         ...stepData,
//         {
//             ...data,
//             id: id,
//             race: +data.race_count,
//             exit: data.garage_begin_time,
//             busStop: data.kpp_begin?.toString(),
//             comeback: data.garage_end_time,
//             day: handleDay(step),
//             busStopEnd: data.kpp_end?.toString(),
//             time: data.kpp_begin_time,
//             timeEnd: data.kpp_end_time,
//             simple: data.prostoy?.toString(),
//             interval: data.interval?.toString(),
//             lunchFrom: data.lunch1_begin,
//             lunchTo: data.lunch1_end,
//             busLunchStop: data.kpp_lunch1?.toString(),
//             dinnerFrom: data.lunch2_begin,
//             dinnerhTo: data.lunch2_end,
//             busDinnerStop: data.kpp_lunch2?.toString(),
//         },
//     ])
//     setId(id + 1);
// };

// else if(step === 3) {
//     updateStepData([
//         ...stepData.slice(0, step),
//         {
//             ...stepData[step],
//             id: id,
//             race: +data.race_count,
//             exit: data.garage_begin_time,
//             busStop: data.kpp_begin.value.toString(),
//             comeback: data.garage_end_time,
//             day: handleDay(step),
//             busStopEnd: data.kpp_end.value.toString(),
//             time: data.kpp_begin_time,
//             timeEnd: data.kpp_end_time,
//             simple: data.prostoy.toString(),
//             interval: data.interval.toString(),
//             lunchFrom: data.lunch1_begin,
//             lunchTo: data.lunch1_end,
//             busLunchStop: data.kpp_lunch1.value.toString(),
//             dinnerFrom: data.lunch2_begin,
//             dinnerhTo: data.lunch2_end,
//             busDinnerStop: data.kpp_lunch2.value.toString(),
//             kpp1: data.kpp_begin,
//             kpp2: data.kpp_end,
//             kpp1Lunch: data.kpp_lunch1,
//             kpp2Lunch: data.kpp_lunch2,
//         },
//     ]);
// }
