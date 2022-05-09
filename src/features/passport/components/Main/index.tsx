import {yupResolver} from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import c from 'classnames';
import React, {useEffect} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useSavePassport from '@api/passport/mutation';
import useCheckPolygon from '@api/passport/useCheckPolygon';
import InputController from '@components/InputController';
import {passportSchema} from '@features/passport/helpers/schema';
import {usePassport} from '@features/passport/helpers/usePassport';
import {SubmitDataModel} from '@models/passport_model';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {usePolygonStore} from '@store/polygon';
import {commentInput} from '@styles/components/helperStyles';

import {InputForm} from '../InputForms/InputForm';
import {SelectForm} from '../InputForms/SelectForm';
import s from './index.module.scss';

const PassportData = () => {
    const {t} = useTranslation();
    const handleSave = useSavePassport();
    const {canEdit} = useLocationPermission('routes');
    const {statKpp1, statKpp2} = usePolygonStore(
        (state) => ({...state}),
        shallow,
    );

    const {
        parkOptions,
        routeTypeOptions,
        kppsOptions,
        routeNameOptions,
        passportValues,
        handleSaveData,
    } = usePassport();

    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<SubmitDataModel>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(passportSchema),
    });

    const kpp1 = useWatch({
        control,
        name: 'kpp1',
    });

    const kpp2 = useWatch({
        control,
        name: 'kpp2',
    });

    useCheckPolygon(kpp1?.value, 'kpp1');
    useCheckPolygon(kpp2?.value, 'kpp2');

    useEffect(() => {
        passportValues &&
            Object.keys(passportValues)?.forEach((key: keyof SubmitDataModel) =>
                setValue(key, passportValues[key]),
            );
    }, [setValue, passportValues]);

    const onSubmit = (data: SubmitDataModel) => {
        handleSave.mutate(handleSaveData(data));
    };

    console.log(errors, 'errors');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.wrapper}>
                <div className={s.block}>
                    <SelectForm
                        label={t('park_number')}
                        control={control}
                        options={parkOptions}
                        name="park"
                        placeholder={t('autopark')}
                        errors={errors}
                    />
                    <SelectForm
                        label={t('route_number')}
                        control={control}
                        options={routeNameOptions}
                        name="route_name"
                        placeholder={t('marshrut')}
                        errors={errors}
                    />
                    <SelectForm
                        label={t('type')}
                        control={control}
                        options={routeTypeOptions}
                        name="route_type"
                        placeholder={t('type')}
                    />
                    <SelectForm
                        label={t('kpp1')}
                        labelIcon={
                            <div
                                className={c('round_icon', [
                                    statKpp1 && 'bg__success',
                                ])}
                            ></div>
                        }
                        control={control}
                        options={kppsOptions}
                        name="kpp1"
                        placeholder={t('kpp1')}
                        errors={errors}
                    />
                    <SelectForm
                        label={t('kpp2')}
                        labelIcon={
                            <div
                                className={c('round_icon', [
                                    statKpp2 && 'bg__success',
                                ])}
                            ></div>
                        }
                        control={control}
                        options={kppsOptions}
                        name="kpp2"
                        placeholder={t('kpp2')}
                        errors={errors}
                    />

                    <span className={s.title}>Простой на конечных, мин</span>
                    <InputForm
                        label="На КПП1"
                        control={control}
                        name="prostoykpp1"
                        placeholder={t('minutes_label')}
                        errors={errors}
                    />
                    <InputForm
                        label="На КПП2"
                        control={control}
                        name="prostoykpp2"
                        placeholder={t('minutes_label')}
                        errors={errors}
                    />
                </div>

                <div className={s.block}>
                    <span className={s.title}>{t('route_dist')}</span>
                    <InputForm
                        label="С КПП1 до КПП2"
                        control={control}
                        name="distkpp1kpp2"
                        placeholder={t('kilometers')}
                        errors={errors}
                    />
                    <InputForm
                        label="С КПП2 до КПП1"
                        control={control}
                        name="distkpp2kpp1"
                        placeholder={t('kilometers')}
                        errors={errors}
                    />

                    <span className={s.title}>{t('race_time')}</span>
                    <InputForm
                        label="С КПП1 до КПП2"
                        control={control}
                        name="vremyakpp1kpp2"
                        placeholder={t('minutes_label')}
                        errors={errors}
                    />
                    <InputForm
                        label="С КПП2 до КПП1"
                        control={control}
                        name="vremyakpp2kpp1"
                        placeholder={t('minutes_label')}
                        errors={errors}
                    />
                </div>

                <div className={s.block}>
                    <span className={s.title}>{t('zero_run_time')}</span>
                    <InputForm
                        label="С А\П до КПП1"
                        control={control}
                        name="vremyaparkkpp1"
                        placeholder={t('minutes_label')}
                        errors={errors}
                    />
                    <InputForm
                        label="С А\П до КПП2"
                        control={control}
                        name="vremyaparkkpp2"
                        placeholder={t('minutes_label')}
                        errors={errors}
                    />

                    <span className={s.title}>{t('zero_run')}</span>
                    <InputForm
                        label="С А\П до КПП1"
                        control={control}
                        name="distparkkpp1"
                        placeholder={t('kilometers')}
                        errors={errors}
                    />
                    <InputForm
                        label="С А\П до КПП2"
                        control={control}
                        name="distparkkpp2"
                        placeholder={t('kilometers')}
                        errors={errors}
                    />
                </div>

                <div className={s.block}>
                    <span className={s.title}>{t('morning_peak')}</span>
                    <InputForm
                        label={t('starttime')}
                        control={control}
                        name="utrenniypikbegin"
                        placeholder={t('time')}
                        type="time"
                        errors={errors}
                    />
                    <InputForm
                        label={t('endtime')}
                        control={control}
                        name="utrenniypikend"
                        placeholder={t('time')}
                        type="time"
                        errors={errors}
                    />

                    <span className={s.title}>{t('evening_peak')}</span>
                    <InputForm
                        label={t('starttime')}
                        control={control}
                        name="vecherniypikbegin"
                        placeholder={t('time')}
                        type="time"
                        errors={errors}
                    />
                    <InputForm
                        label={t('endtime')}
                        control={control}
                        name="vecherniypikend"
                        placeholder={t('time')}
                        type="time"
                        errors={errors}
                    />
                </div>
            </div>

            <div className={s.footer}>
                <span className={s.commentTitle}>{t('comment')}</span>
                <div className={s.textArea}>
                    <InputController
                        areaWidth="100%"
                        control={control}
                        name="remark"
                        placeholder={t('addcomment')}
                        errors={errors.remark?.type}
                        message={errors.remark?.message}
                        multiline
                        sx={commentInput}
                    />
                </div>

                <div className={s.button}>
                    {canEdit && (
                        <Button
                            type="submit"
                            disabled={handleSave.isLoading}
                            className={s.btnPrimary}
                        >
                            {t('save')}
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default PassportData;
