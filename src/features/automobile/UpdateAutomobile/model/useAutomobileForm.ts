import {yupResolver} from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import shallow from 'zustand/shallow';

import useParkMutation from '@api/park/mutations';
import {useAutomobileStore} from '@store/automobile';
import {useParkStore} from '@store/park';

import {AutoFormProps, automobileScheme} from '../libs/schema';

const useAutomobileForm = () => {
    const {polygons} = useAutomobileStore((state) => ({...state}), shallow);
    const {handleUpdatePark, getSinglePark} = useParkMutation();

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
    } = useForm<AutoFormProps>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(automobileScheme),
        defaultValues: {
            garages: [{name: ''}],
        },
    });

    const {selectedPark} = useParkStore((state) => ({...state}), shallow);

    //form field array
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'garages',
    });

    const onSubmit = (data: AutoFormProps) => {
        const fDate = dayjs(data.license_expire_date).format('YYYY-MM-DD');

        let garage_list: any;
        // eslint-disable-next-line prefer-const
        garage_list = data.garages?.map((item: any, index: number) => {
            item.coords = polygons[index];
            return item;
        });

        setTimeout(() => {
            handleUpdatePark.mutate({
                id: selectedPark[0]?.id,
                license_name: data.license_name,
                license_number: data.license_number,
                license_expire_date: fDate,
                short_name: data.short_name,
                remark: data.remark,
                region_id: +data.region_id?.value,
                garage_list: garage_list,
            });
        }, 100);
    };

    useEffect(() => {
        if (selectedPark[0]?.park) {
            console.log(selectedPark[0].park, 'park data');
            setValue('license_name', selectedPark[0].park);
            setValue(
                'license_expire_date',
                dayjs(selectedPark[0]?.license_expire_date).format(),
            );
            setValue('license_number', selectedPark[0]?.license_number);
            setValue('remark', selectedPark[0].remark);
        }
    }, [selectedPark[0]?.park, getSinglePark.isLoading]);

    return {
        fields,
        append,
        remove,
        reset,
        handleSubmit,
        errors,
        setValue,
        getSinglePark,
        handleUpdatePark,
        onSubmit,
        control,
    };
};

export default useAutomobileForm;
