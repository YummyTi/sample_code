import {yupResolver} from '@hookform/resolvers/yup';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import cx from 'classnames';
import dayjs from 'dayjs';
import React, {useEffect, useMemo} from 'react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useGarages from '@src/shared/api/garages/hooks';
import DialogWrapper from '@src/shared/components/CustomDialog';

import useParkMutation from '@api/park/mutations';
import useRegion from '@api/region/hooks';
import InputController from '@components/InputController';
import SelectController from '@components/SelectController';
import {helper} from '@shared/helpers';
import {useAccessStore} from '@store/access_rights';
import {useAutomobileStore} from '@store/automobile';
import {useGaragesStore} from '@store/garages';
import {useMainStore} from '@store/main';
import {useParkStore} from '@store/park';
import {useRegionStore} from '@store/region';

import AddIcon from '@images/svgs/AddIcon';
import CloseIcon from '@images/svgs/CloseIcon';
import {XIcon} from '@images/svgs/XIcon';

import ParkPolygonMap from '../ParkPolygonMap';
import styles from './index.module.scss';
import {AutoFormProps, automobileScheme} from './schema';

const {handleOption} = helper;

const AddAutomobile = () => {
    const {t} = useTranslation();
    useGarages();
    const open = useMainStore((state) => state.open);
    const {setCoords} = useParkStore((state) => ({...state}), shallow);
    const setOpen = useMainStore((state) => state.handleTap);
    const setRefetchC = useAccessStore((state) => state.setRefetchCount);
    const {
        polyLines,
        polygons,
        setPolygons,
        setPolyLines,
        setPolygonCoords,
        clearPolygons,
    } = useAutomobileStore((state) => ({...state}), shallow);
    const {handleSavePark} = useParkMutation();
    const {isLoading} = useRegion();
    const {setGarages, garages} = useGaragesStore(
        (state) => ({...state}),
        shallow,
    );

    const coords = useParkStore((state) => state.coords);
    const regions = useRegionStore((state) => state.regions);
    const optionRegions = useMemo(() => handleOption(regions), [regions]);
    const garageOptions = useMemo(
        () => handleOption(garages, 'name', 'id'),
        [garages],
    );

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
            item.id = item.name.value;
            item.name = item.name.label;
            return item;
        });

        setTimeout(() => {
            handleSavePark.mutate({
                license_name: data.license_name,
                license_number: data.license_number,
                license_expire_date: fDate,
                short_name: data.short_name,
                remark: data.remark,
                region_id: +data.region_id?.value,
                garage_list: garage_list,
            });
        }, 20);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (handleSavePark.isSuccess) {
            setOpen(false);
            setRefetchC();
            reset();
            clearPolygons();
        }
    }, [handleSavePark.isSuccess]);

    const filterGarages = () => {
        const foundObj = garages.filter((item: any) =>
            fields?.find((i: any) => i.name.value === item.id),
        );
        console.log(foundObj, 'foundObj');
        // setGarages([]);
        const filterObj = garages.filter(
            (item: any) => item.id !== foundObj[0]?.id,
        );
        setGarages(filterObj);
    };

    const handleAddPolygon = () => {
        append({
            name: '',
        });
        if (polyLines.length > 0) {
            setPolygons(polyLines);
        }
        setPolygonCoords(coords);
        setTimeout(() => {
            setPolyLines([]);
            setCoords([]);
        }, 200);
    };

    useEffect(() => {
        if (!open) {
            clearPolygons();
        }
    }, [open]);

    return (
        <DialogWrapper
            open={open}
            onClose={handleClose}
            title={t('add_automobile')}
            isForm
            width="700px"
            save={handleSubmit(onSubmit)}
            isLoading={handleSavePark.isLoading}
            saveLabel={t('add')}
        >
            <div className={styles.contentBlock}>
                <div className={styles.block}>
                    <div className={styles.subBlock}>
                        <InputController
                            control={control}
                            name="license_name"
                            placeholder={t('law_legal_name')}
                            size="small"
                            label={t('law_legal_name')}
                            type="text"
                            styles={styles.input}
                            errors={errors.license_name?.type}
                            message={errors.license_name?.message}
                        />

                        <InputController
                            control={control}
                            name="license_number"
                            placeholder={t('license_number_passenger')}
                            size="small"
                            label={t('license_number_passenger')}
                            type="number"
                            styles={styles.input}
                            message={errors.license_number?.message}
                            errors={errors.license_number?.type}
                        />

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
                                        renderInput={(params: any) => (
                                            <TextField
                                                className={styles.input}
                                                size="small"
                                                {...params}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            )}
                        />

                        <InputController
                            control={control}
                            name="short_name"
                            placeholder={t('short_brand_name')}
                            size="small"
                            label={t('short_brand_name')}
                            type="text"
                            styles={styles.input}
                            errors={errors.short_name?.type}
                            message={errors.short_name?.message}
                        />

                        <InputController
                            control={control}
                            name="remark"
                            placeholder={t('remark')}
                            size="small"
                            label={t('remark')}
                            type="textarea"
                            multiline
                            styles={styles.input}
                            errors={errors.remark?.type}
                        />
                    </div>

                    <div className={styles.subBlock}>
                        <div className={styles.input}>
                            <SelectController
                                control={control}
                                required={true}
                                name="region_id"
                                label={t('region')}
                                placeholder={t('region')}
                                options={optionRegions}
                                isDisabled={isLoading}
                                styles={styles.input}
                                errors={errors.region_id}
                                message={errors.region_id}
                            />
                        </div>

                        {fields?.length > 0 &&
                            fields?.map((item, index) => {
                                return (
                                    <div className={styles.inputRow}>
                                        <SelectController
                                            control={control}
                                            required={true}
                                            name={`garages.${index}.name`}
                                            label={t('garage')}
                                            placeholder={t('garage')}
                                            options={garageOptions}
                                            isDisabled={isLoading}
                                            styles={styles.input}
                                            errors={
                                                errors.garages?.[index]?.name
                                                    ? true
                                                    : false
                                            }
                                            message={
                                                errors.garages?.[index]?.name
                                            }
                                        />
                                        {index === fields.length - 1 &&
                                            index !== 0 && (
                                                <IconButton
                                                    onClick={() => {
                                                        remove(index);
                                                        setValue(
                                                            'garages',
                                                            fields.filter(
                                                                (item, ind) =>
                                                                    ind !==
                                                                    index,
                                                            ),
                                                        );
                                                    }}
                                                >
                                                    <XIcon />
                                                </IconButton>
                                            )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.parkContainer}>
                        <ParkPolygonMap />
                    </div>
                    {garageOptions?.length > 1 && (
                        <Button
                            onClick={handleAddPolygon}
                            className="btn__info"
                            fullWidth
                        >
                            <AddIcon className={styles.addIcon} />
                            {t('add_garage')}
                        </Button>
                    )}
                </div>
            </div>
        </DialogWrapper>
    );
};

export default React.memo(AddAutomobile);
