import {yupResolver} from '@hookform/resolvers/yup';
import {DatePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {TextField} from '@mui/material';
import {AxiosResponse} from 'axios';
import cx from 'classnames';
import dayjs from 'dayjs';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {UseMutationResult} from 'react-query';

import useRegion from '@src/shared/api/region/hooks';
import DialogWrapper from '@src/shared/components/CustomDialog';
import InputTemplate from '@src/shared/components/CustomInput';
import SelectTemplate from '@src/shared/components/CustomSelect';

import InputController from '@components/InputController';
import {IAutoTransModel} from '@models/autotrans_model';
import {helper} from '@shared/helpers';
import {commentInput} from '@styles/components/helperStyles';

import s from './index.module.scss';
import {AutoTransSaveProps, autoTransScheme} from './schema';

const {handleOption} = helper;

interface Props {
    store: {
        selectedAutoTrans: IAutoTransModel[];
        setSelectedAutoTrans: (payload: IAutoTransModel[]) => void;
        setRefetchCount: () => void;
    };
    mutate: UseMutationResult<AxiosResponse<any, any>, any, void, unknown>;
    modal: {
        handleModal: (payload: boolean) => void;
        open: boolean;
    };
}

const FormField: FC<Props> = ({store, mutate, modal}) => {
    const {t} = useTranslation();
    const {regionList} = useRegion();

    const optionRegions = useMemo(() => handleOption(regionList), [regionList]);

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
    } = useForm<AutoTransSaveProps>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(autoTransScheme),
    });

    const dateToString = (data: string) => dayjs(data).format('YYYY-MM-DD');

    const onSubmit = (data: AutoTransSaveProps) => {
        const saveData = {
            ...data,
            bus_id: 5058, // bus_id is needed to post update
            model_id: parseInt(data.model_id as any),
            region_id: data.region_id?.value,
            made_date: dateToString(data.made_date),
            insurance_expire_date: dateToString(data.insurance_expire_date),
            license_expire_date: dateToString(data.license_expire_date),
            tex_expire_date: dateToString(data.tex_expire_date),
        };
        console.log(data, 'submit data');
        console.log(saveData, 'save data');
        mutate.mutate(saveData as any);
    };

    const handleClose = () => {
        store.setSelectedAutoTrans([]);
        modal.handleModal(false);
    };

    useEffect(() => {
        if (mutate.isSuccess) {
            handleClose();
            store.setRefetchCount();
        }
    }, [mutate.isSuccess]);

    const selected = store.selectedAutoTrans[0];

    useEffect(() => {
        if ((selected?.garage_number || selected?.gos_number) !== undefined) {
            setValue('garage_number', selected?.garage_number);
            setValue('gos_number', selected?.gos_number as any);
        }
    }, [selected?.garage_number, selected?.gos_number]);

    return (
        <DialogWrapper
            open={modal.open}
            onClose={handleClose}
            title={selected ? t('edit') : t('add')}
            save={handleSubmit(onSubmit)}
            isLoading={mutate.isLoading}
            saveLabel={selected ? t('edit') : t('add')}
            isForm
        >
            <div className={s.wrapper}>
                <div className={s.container}>
                    <div className={s.block}>
                        <InputTemplate
                            name="garage_number"
                            control={control}
                            placeholder={t('garage_number')}
                            errors={errors}
                        />

                        <InputTemplate
                            name="gos_number"
                            control={control}
                            placeholder={t('gos_number')}
                            errors={errors}
                        />
                    </div>

                    <div className={s.block}>
                        <SelectTemplate
                            control={control}
                            name="region_id"
                            options={optionRegions}
                            placeholder={t('region')}
                            errors={errors}
                        />

                        <InputTemplate
                            name="parkId"
                            control={control}
                            placeholder={t('parkId')}
                            errors={errors}
                        />
                    </div>

                    <div className={s.block}>
                        <InputTemplate
                            name="model_id"
                            control={control}
                            placeholder={t('model_id')}
                            errors={errors}
                        />

                        <div style={{width: '167px'}}>
                            <Controller
                                name="made_date"
                                control={control}
                                render={({field: {ref, ...fieldRest}}) => (
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            label={t('made_date')}
                                            {...fieldRest}
                                            renderInput={(params) => (
                                                <TextField
                                                    className={cx(
                                                        'mui_textfield',
                                                    )}
                                                    size="small"
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </div>
                    </div>

                    <div className={s.block}>
                        <InputTemplate
                            name="tracker_imei"
                            control={control}
                            placeholder={t('tracker_imei')}
                            errors={errors}
                        />

                        <InputTemplate
                            name="sim_number"
                            control={control}
                            placeholder={t('sim_number')}
                            errors={errors}
                        />
                    </div>

                    <div className={s.block}>
                        <InputTemplate
                            name="insurance_number"
                            control={control}
                            placeholder={t('insurance_number')}
                            errors={errors}
                        />

                        <div style={{width: '167px'}}>
                            <Controller
                                name="insurance_expire_date"
                                control={control}
                                render={({field: {ref, ...fieldRest}}) => (
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            label={t('insurance_expire_date')}
                                            {...fieldRest}
                                            renderInput={(params) => (
                                                <TextField
                                                    className={cx(
                                                        'mui_textfield',
                                                    )}
                                                    size="small"
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </div>
                    </div>

                    <div className={s.block}>
                        <InputTemplate
                            name="license_number"
                            control={control}
                            placeholder={t('license_number')}
                            errors={errors}
                        />

                        <div style={{width: '167px'}}>
                            <Controller
                                name="license_expire_date"
                                control={control}
                                render={({field: {ref, ...fieldRest}}) => (
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            label={t('license_expire_date')}
                                            {...fieldRest}
                                            renderInput={(params) => (
                                                <TextField
                                                    className={cx(
                                                        'mui_textfield',
                                                    )}
                                                    size="small"
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </div>
                    </div>

                    <div className={s.block}>
                        <InputTemplate
                            name="tex_number"
                            control={control}
                            placeholder={t('tex_number')}
                            errors={errors}
                        />

                        <div style={{width: '167px'}}>
                            <Controller
                                name="tex_expire_date"
                                control={control}
                                render={({field: {ref, ...fieldRest}}) => (
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DatePicker
                                            label={t('tex_expire_date')}
                                            {...fieldRest}
                                            renderInput={(params) => (
                                                <TextField
                                                    className={cx(
                                                        'mui_textfield',
                                                    )}
                                                    size="small"
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <InputController
                    name="remark"
                    control={control}
                    placeholder={t('remark')}
                    errors={errors.remark?.type}
                    message={errors.remark?.message}
                    multiline
                    sx={commentInput}
                />
            </div>
        </DialogWrapper>
    );
};

export default React.memo(FormField);
