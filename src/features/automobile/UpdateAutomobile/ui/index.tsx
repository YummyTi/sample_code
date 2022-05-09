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
import React, {useCallback, useEffect, useMemo} from 'react';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useGarages from '@src/shared/api/garages/hooks';

import useGarageByPark from '@api/park/useGarageByPark';
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

import ParkPolygonMap from '../../ParkPolygonMap';
import useAutomobileForm from '../model/useAutomobileForm';
import styles from './index.module.scss';

const {handleOption} = helper;

const UpdateAutomobile = () => {
    const {t} = useTranslation();
    useGarages();
    const open = useMainStore((state) => state.openUpdate);
    const setOpen = useMainStore((state) => state.handleOpenUpdate);
    const {garages} = useGaragesStore((state) => ({...state}), shallow);
    const {setCoords, coords, selectedPark, parkData, garagePark} =
        useParkStore((state) => ({...state}), shallow);

    const {
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
    } = useAutomobileForm();
    const garageOptions = useMemo(
        () => handleOption(garages, 'name', 'park_id'),
        [garages],
    );

    console.log(garageOptions, garages, 'garageOptions');
    const {isLoading: gLoading} = useGarageByPark();
    const setRefetchC = useAccessStore((state) => state.setRefetchCount);
    const {polyLines, setPolygons, setPolyLines, setPolygonCoords} =
        useAutomobileStore((state) => ({...state}), shallow);
    const {isLoading} = useRegion();

    const regions = useRegionStore((state) => state.regions);
    const optionRegions = useMemo(() => handleOption(regions), [regions]);

    useEffect(() => {
        if (open && selectedPark.length === 1 && selectedPark[0]?.id) {
            getSinglePark.mutate(selectedPark[0].id);
        }
    }, [open, selectedPark[0]]);

    useEffect(() => {
        if (handleUpdatePark.isSuccess) {
            handleClose();
            setRefetchC();
            reset();
        }
    }, [handleUpdatePark.isSuccess]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleAddPolygon = () => {
        append({
            name: '',
        });
        if (polyLines?.length > 0) {
            setPolygons(polyLines);
        }
        setPolygonCoords(coords);
        setTimeout(() => {
            setPolyLines([]);
            setCoords([]);
        }, 200);
    };

    console.log(garagePark, 'garagePark');

    return (
        <Dialog
            open={open}
            // onClose={handleClose}
            fullWidth
            maxWidth="md"
            scroll="paper"
            keepMounted
            className={styles.modal}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle className={styles.heading} id="scroll-dialog-title">
                <div className="row">
                    <p className={styles.title}>{t('add_polygon')}</p>
                    <div className="flex__end">
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={styles.content} dividers={true}>
                    {getSinglePark.isLoading ? (
                        <div className={styles.loading}>
                            <CircularProgress />
                        </div>
                    ) : (
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
                                        defaultValue={parkData?.park_name}
                                        styles={styles.input}
                                        errors={errors.license_name?.type}
                                        message={errors.license_name?.message}
                                    />

                                    <InputController
                                        control={control}
                                        name="license_number"
                                        placeholder={t(
                                            'license_number_passenger',
                                        )}
                                        defaultValue={
                                            parkData?.park_license_num
                                        }
                                        size="small"
                                        label={t('license_number_passenger')}
                                        type="text"
                                        styles={styles.input}
                                        message={errors.license_number?.message}
                                        errors={errors.license_number?.type}
                                    />

                                    <Controller
                                        name="license_expire_date"
                                        control={control}
                                        render={({
                                            field: {ref, ...fieldRest},
                                        }) => (
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DatePicker
                                                    label={t(
                                                        'license_expire_date',
                                                    )}
                                                    {...fieldRest}
                                                    renderInput={(
                                                        params: any,
                                                    ) => (
                                                        <TextField
                                                            className={
                                                                styles.input
                                                            }
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
                                        defaultValue={parkData?.short_name}
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
                                        defaultValue={selectedPark[0]?.remark}
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
                                                <div
                                                    className={styles.inputRow}
                                                >
                                                    <SelectController
                                                        control={control}
                                                        required={true}
                                                        name={`garages.${index}.name`}
                                                        label={t('garage')}
                                                        placeholder={t(
                                                            'garage',
                                                        )}
                                                        options={garageOptions}
                                                        isDisabled={isLoading}
                                                        styles={styles.input}
                                                        errors={
                                                            errors.garages?.[
                                                                index
                                                            ]?.name
                                                                ? true
                                                                : false
                                                        }
                                                        message={
                                                            errors.garages?.[
                                                                index
                                                            ]?.name
                                                        }
                                                    />
                                                    {index ===
                                                        fields.length - 1 &&
                                                        index !== 0 && (
                                                            <IconButton
                                                                onClick={() => {
                                                                    remove(
                                                                        index,
                                                                    );
                                                                    setValue(
                                                                        'garages',
                                                                        fields.filter(
                                                                            (
                                                                                item,
                                                                                ind,
                                                                            ) =>
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
                                <Button
                                    onClick={handleAddPolygon}
                                    className="btn__info"
                                    fullWidth
                                >
                                    <AddIcon className={styles.addIcon} />
                                    {t('add_garage')}
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button className="btn__secondary" onClick={handleClose}>
                        {t('cancel')}
                    </Button>
                    <Button
                        variant="contained"
                        className={cx('btn__primary', styles?.formBtn, [
                            handleUpdatePark.isLoading ? 'btn__disabled' : '',
                        ])}
                        type="submit"
                        fullWidth={false}
                        disabled={handleUpdatePark.isLoading}
                    >
                        {t('edit')}
                        {handleUpdatePark.isLoading && (
                            <CircularProgress size={15} />
                        )}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default React.memo(UpdateAutomobile);
