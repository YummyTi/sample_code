import {yupResolver} from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import cx from 'classnames';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import CloseIcon from '@src/images/svgs/CloseIcon';
import TrashIcon from '@src/images/svgs/TrashIcon';
import useGraphicById from '@src/shared/api/graphic/hooks';
import useOrderMutation from '@src/shared/api/route_exchange/mutations';
import InputController from '@src/shared/components/InputController';
import SelectController from '@src/shared/components/SelectController';
import Transition from '@src/shared/components/Transistion';
import {EmployeeModel} from '@src/shared/models/employees_model';
import {RouteExchangeOrder} from '@src/shared/models/route_exchange_model';
import {useEmployeeStore} from '@src/shared/store/employee';
import {useOrderStore} from '@src/shared/store/order';
import {useStationsStore} from '@src/shared/store/station';

import {helper} from '@shared/helpers';

import styles from './index.module.scss';
import {FormProps, orderScheme} from './schema';

const {getSingle, handleOption} = helper;

const EditOrder = () => {
    useGraphicById();
    const {t} = useTranslation();
    const {employees} = useEmployeeStore((state) => ({...state}), shallow);
    const stationList = useStationsStore((state) => state.stations);
    const {
        openM,
        setOpenM,
        closeModal,
        selectedOrder,
        date,
        routeId,
        orderGarages,
        setFetchUp,
        fetchCount,
        setGraphId,
    } = useOrderStore((state) => ({...state}), shallow);
    const employeoptions = useMemo(
        () => handleOption(employees, 'tab_num', 'id'),
        [employees],
    );

    const {handleSave, handleDelete} = useOrderMutation();

    const optionGarageNumbers = useMemo(
        () => handleOption(orderGarages, 'g', 'id'),
        [orderGarages],
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
        resolver: yupResolver(orderScheme),
    });

    const onSubmit = (data: FormProps) => {
        const fromTime = data.from_time?.split('-');

        handleSave.mutate({
            ex_id: selectedOrder?.ex_id,
            driver_id: data.tab_num?.value,
            from_time: fromTime[0],
            to_time: data.to_time,
            graph_number: data.graph_number?.value,
            station_id: data.station_id?.value,
            date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
            race: data.race,
            bus_fact: data.graph_number?.value,
            route_id: routeId,
        });
    };

    const handleClose = useCallback(() => {
        setOpenM(false);
    }, []);

    const tabNumber = useWatch({
        control,
        name: 'tab_num',
    });

    const graphNumber = useWatch({
        control,
        name: 'graph_number',
    });

    const graphicId = useWatch({
        control,
        name: 'graphic',
    });

    const objFound: any = orderGarages.find(
        (item) => item.id === graphNumber?.value,
    );

    const graphObj: any = employees.find(
        (item) => item.id === tabNumber?.value,
    );

    useEffect(() => {
        setValue('driver_id', graphObj?.fullname);
    }, [tabNumber]);

    useEffect(() => {
        setValue('model', objFound?.model);
        setValue('gos', objFound?.vianum);
    }, [graphNumber]);

    useEffect(() => {
        const dayType = getSingle();
        setValue('even', dayType);
    }, []);

    useEffect(() => {
        console.log(selectedOrder?.driver_name, 'driver_name');
        if (selectedOrder?.driver_name && openM) {
            const driver: EmployeeModel | any = employees?.find(
                (item) => item.fullname === selectedOrder?.driver_name,
            );

            const garage_num: RouteExchangeOrder | any = orderGarages?.find(
                (item) => item.model === selectedOrder.model,
            );

            console.log(garage_num, orderGarages, 'garage number');
            setValue('driver_id', selectedOrder.driver_name);
            setValue('station_id', selectedOrder.station);
            setValue('graph_number', {
                value: garage_num?.id,
                label: garage_num.g,
            });
            // setValue("station_id")

            setValue(
                'from_time',
                selectedOrder?.from_time + '-' + selectedOrder?.to_time,
            );
            setValue('model', selectedOrder.model);
            setValue('gos', selectedOrder.gos);
            setValue('to_time', selectedOrder?.to_time);
            setValue('race', selectedOrder.race);
        }

        if (selectedOrder?.graph_id) {
            setValue('graphic', selectedOrder.graph_id);
        }
    }, [selectedOrder, openM]);

    useEffect(() => {
        if (handleSave.isSuccess || handleDelete.isSuccess) {
            reset({});
            setOpenM(false);
            setFetchUp(fetchCount + 1);
        }
    }, [handleSave.isSuccess, handleDelete.isSuccess]);

    useEffect(() => {
        if (graphicId?.length) {
            setGraphId(graphicId);
        }
    }, [graphicId]);

    return (
        <Dialog
            open={openM}
            // onClose={handleClose}
            TransitionComponent={Transition}
            fullWidth
            maxWidth="md"
            scroll="paper"
            keepMounted
            className={styles.modal}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle className={styles.heading} id="scroll-dialog-title">
                <div className={styles.row}>
                    <p className={styles.title}>{t('edit_order')}</p>
                    <div className="flex__end">
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={styles.content} dividers={true}>
                    <div className={styles.contentBlock}>
                        <div className={styles.block}>
                            <div className={styles.subBlock}>
                                <div className={cx('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('graphic')}</p>
                                        <InputController
                                            control={control}
                                            name="graphic"
                                            placeholder={t('graphic')}
                                            size="small"
                                            type="number"
                                            disabled
                                            // errors={errors.prostoy?.type}
                                            // message={errors.prostoy?.message}
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('time_from')}</p>
                                        <InputController
                                            control={control}
                                            name="from_time"
                                            size="small"
                                            type="text"
                                            disabled
                                            placeholder="00:00-00:00"
                                            // errors={errors.garage_end_time?.type}
                                            // message={errors.garage_end_time?.message}
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('race')}</p>
                                        <InputController
                                            control={control}
                                            name="race"
                                            placeholder={t('race')}
                                            size="small"
                                            type="text"
                                            disabled
                                            // errors={errors.prostoy?.type}
                                            // message={errors.prostoy?.message}
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('starttime')}</p>

                                        <InputController
                                            control={control}
                                            name="station_id"
                                            placeholder={t('starttime')}
                                            size="small"
                                            type="text"
                                            disabled
                                            // errors={errors.prostoy?.type}
                                            // message={errors.prostoy?.message}
                                        />
                                    </div>
                                </div>

                                <div className={cx('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('g_num')}</p>
                                        <SelectController
                                            control={control}
                                            required={true}
                                            name="graph_number"
                                            placeholder={t('g_num')}
                                            options={optionGarageNumbers}
                                            styles={styles.input}
                                            // errors={errors.region_id}
                                            // message={errors.region_id}
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('model_ts')}</p>
                                        <InputController
                                            control={control}
                                            name="model"
                                            size="small"
                                            disabled
                                            placeholder={t('model_ts')}
                                            // errors={errors.garage_end_time?.type}
                                            // message={errors.garage_end_time?.message}
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('gos_number')}</p>
                                        <InputController
                                            control={control}
                                            name="gos"
                                            size="small"
                                            disabled
                                            placeholder={t('gos_number')}
                                            // errors={errors.garage_end_time?.type}
                                            // message={errors.garage_end_time?.message}
                                        />
                                    </div>
                                </div>

                                <div className={cx('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('tab_num')}</p>
                                        <SelectController
                                            control={control}
                                            required={true}
                                            name="tab_num"
                                            placeholder={t('tab_num')}
                                            options={employeoptions}
                                            styles={styles.input}
                                            // errors={errors.region_id}
                                            // message={errors.region_id}
                                        />
                                    </div>

                                    <div className="form__item__order">
                                        <p>{t('driver_name')}</p>

                                        <InputController
                                            control={control}
                                            name="driver_id"
                                            size="small"
                                            disabled
                                            placeholder={t('driver_name')}
                                            // errors={errors.garage_end_time?.type}
                                            // message={errors.garage_end_time?.message}
                                        />
                                    </div>
                                    <div className="form__item__order">
                                        <p>{t('days_ch')}</p>
                                        <InputController
                                            control={control}
                                            name="even"
                                            size="small"
                                            disabled
                                            placeholder={t('days_ch')}
                                            // errors={errors.garage_end_time?.type}
                                            // message={errors.garage_end_time?.message}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className={cx('flex__end', 'gap_12')}>
                        <Button
                            className="btn__secondary"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            className="btn__danger"
                            onClick={() => {
                                handleDelete.mutate(selectedOrder?.ex_id);
                            }}
                            disabled={handleDelete.isLoading}
                            startIcon={<TrashIcon className="f_16" />}
                        >
                            {handleDelete.isLoading ? (
                                <CircularProgress color="inherit" size={20} />
                            ) : (
                                <span>{t('clear').toUpperCase()}</span>
                            )}
                        </Button>
                        <Button
                            className="btn__primary"
                            type="submit"
                            // onClick={() => {
                            //     setOpenS(false);
                            // }}
                            disabled={handleSave.isLoading}
                        >
                            {handleSave.isLoading ? (
                                <CircularProgress color="inherit" size={20} />
                            ) : (
                                <span>{t('add').toUpperCase()}</span>
                            )}
                        </Button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default React.memo(EditOrder);

// const stationOptions = useMemo(
//     () => handleOption(stationList, 'name', 'id'),
//     [stationList],
// );
