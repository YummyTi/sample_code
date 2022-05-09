import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import shallow from 'zustand/shallow';

import {
    FormProps,
    formScheme,
} from '@features/schedule/components/Form/schema/index';
import {useScheduleStore} from '@store/schedule';

const useFormAction = () => {
    const {openM, stepData, step, update} = useScheduleStore(
        (state) => ({...state}),
        shallow,
    );

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
    } = useForm<FormProps>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(formScheme),
    });
    const firstStep = openM && stepData?.length >= 1 && step === 0 && update;
    const secondStep = openM && stepData?.length >= 2 && step === 1 && update;
    const thirdStep = openM && stepData?.length >= 3 && step === 2 && update;
    const fourthStep = openM && stepData?.length >= 4 && step === 3 && update;

    const handleUpdate = (stepN: number) => {
        setValue('interval', stepData[stepN].interval);

        setValue('prostoy', stepData[stepN].prostoy);
        setValue(
            'garage_begin_time',
            stepData[stepN].exit
                ? stepData[stepN].exit
                : stepData[stepN].garageBeginTime,
        );
        setValue(
            'garage_end_time',
            stepData[stepN].comeback
                ? stepData[stepN].comeback
                : stepData[stepN].garageEndTime,
        );
        setValue('kpp_begin', {
            label: stepData[stepN].kpp1
                ? stepData[stepN].kpp1.label
                : stepData[stepN].kppBegin.name,
            value: stepData[stepN].kpp1
                ? stepData[stepN].kpp1.value
                : stepData[stepN].kppBegin.id,
        });
        setValue('kpp_end', {
            label: stepData[stepN].kpp2
                ? stepData[stepN].kpp2.label
                : stepData[stepN].kppEnd.name,
            value: stepData[stepN].kpp2
                ? stepData[stepN].kpp2.value
                : stepData[stepN].kppEnd.id,
        });
        setValue('kpp_lunch1', {
            label: stepData[stepN].kpp1Lunch
                ? stepData[stepN].kpp1Lunch.label
                : stepData[stepN].kppLunch1.name,
            value: stepData[stepN].kpp1Lunch
                ? stepData[stepN].kpp1Lunch.value
                : stepData[stepN].kppLunch1.id,
        });
        setValue('kpp_lunch2', {
            label: stepData[stepN].kpp2Lunch
                ? stepData[stepN].kpp2Lunch.label
                : stepData[stepN].kppLunch2.name,
            value: stepData[stepN].kpp2Lunch
                ? stepData[stepN].kpp2Lunch.value
                : stepData[stepN].kppLunch2.id,
        });
        setValue(
            'race_count',
            stepData[stepN].race
                ? stepData[stepN].race
                : stepData[stepN].raceCount,
        );
        setValue(
            'kpp_begin_time',
            stepData[stepN].time
                ? stepData[stepN].time
                : stepData[stepN].kppBeginTime,
        );
        setValue(
            'kpp_end_time',
            stepData[stepN].timeEnd
                ? stepData[stepN].timeEnd
                : stepData[stepN].kppEndTime,
        );
        setValue(
            'lunch1_begin',
            stepData[stepN].lunchFrom
                ? stepData[stepN].lunchFrom
                : stepData[stepN].lunch1Begin,
        );
        setValue(
            'lunch1_end',
            stepData[stepN].lunchTo
                ? stepData[stepN].lunchTo
                : stepData[stepN].lunch1End,
        );
        setValue(
            'lunch2_begin',
            stepData[stepN].dinnerFrom
                ? stepData[stepN].dinnerFrom
                : stepData[stepN].lunch2Begin,
        );
        setValue(
            'lunch2_end',
            stepData[stepN].dinnerhTo
                ? stepData[stepN].dinnerhTo
                : stepData[stepN].lunch2End,
        );
    };

    const handleValue = () => {
        if (firstStep) {
            handleUpdate(0);
        } else if (secondStep) {
            handleUpdate(1);
        } else if (thirdStep) {
            handleUpdate(2);
        } else if (fourthStep) {
            handleUpdate(3);
        }
    };

    useEffect(() => {
        handleValue();
    }, [openM, stepData?.length, step]);

    return {
        control,
        handleSubmit,
        reset,
        errors,
    };
};

export default useFormAction;
