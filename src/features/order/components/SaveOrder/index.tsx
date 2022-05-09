import {yupResolver} from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import c from 'classnames';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useGraphicById from '@api/graphic/hooks';
import useOrderMutation from '@api/route_exchange/mutations';
import InputController from '@components/InputController';
import SelectController from '@components/SelectController';
import Transition from '@components/Transistion';
import {helper, localNotification} from '@shared/helpers';
import {useEmployeeStore} from '@store/employee';
import {useOrderStore} from '@store/order';

import CloseIcon from '@images/svgs/CloseIcon';

import styles from './index.module.scss';
import {FormProps, orderScheme} from './schema';

const {getSingle, handleOption} = helper;
const {notifyWaring} = localNotification;

const SaveOrder = () => {
    useGraphicById();
    const {t} = useTranslation();
    const {handleSave} = useOrderMutation();

    // const optionGarageNumbers: any = [];
    const {employees} = useEmployeeStore((state) => ({...state}), shallow);

    const {
        openS,
        setOpenS,
        orderGarages,
        date,
        routeId,
        setFetchUp,
        fetchCount,
        setGraphId,
        graphic,
    } = useOrderStore((state) => ({...state}), shallow);
    const optionGarageNumbers = useMemo(
        () => handleOption(orderGarages, 'g', 'id'),
        [orderGarages],
    );

    const employeoptions = useMemo(
        () => handleOption(employees, 'tab_num', 'id'),
        [employees],
    );

    const {control, handleSubmit, formState, reset, setValue} =
        useForm<FormProps>({
            mode: 'onChange',
            shouldFocusError: true,
            resolver: yupResolver(orderScheme),
        });

    const onSubmit = (data: FormProps) => {
        const fromTime = data.from_time?.split('-');
        if (graphic?.length > 0) {
            handleSave.mutate({
                ex_id: null,
                driver_id: +data.tab_num?.value,
                from_time: fromTime[0],
                to_time: data.to_time,
                graph_number: +data.graphic,
                station_id: graphic[0]?.station_id,
                date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
                race: data.race,
                bus_fact: data.graph_number?.value,
                route_id: routeId,
            });
        } else {
            notifyWaring(t('no_graphic'));
        }
    };

    const graphNumber = useWatch({
        control,
        name: 'graph_number',
    });

    const tabNumber = useWatch({
        control,
        name: 'tab_num',
    });

    const graphicId = useWatch({
        control,
        name: 'graphic',
    });

    const handleClose = useCallback(() => {
        setOpenS(false);
    }, []);

    const objFound: any = orderGarages.find(
        (item) => item.id === graphNumber?.value,
    );

    const graphObj: any = employees.find(
        (item) => item.id === tabNumber?.value,
    );

    useEffect(() => {
        setValue('model', objFound?.model);
        setValue('gos', objFound?.vianum);
    }, [graphNumber]);

    useEffect(() => {
        if (tabNumber) {
            setValue('driver_id', graphObj?.fullname);
        }
    }, [tabNumber]);

    useEffect(() => {
        const dayType = getSingle();
        setValue('even', dayType);
    }, []);

    useEffect(() => {
        if (handleSave.isSuccess) {
            reset({
                graph_number: null,
                model: '',
                gos: '',
            });
            setOpenS(false);
            setFetchUp(fetchCount + 1);
        }
    }, [handleSave.isSuccess]);

    useEffect(() => {
        if (graphicId?.length) {
            setGraphId(graphicId);
        }
    }, [graphicId]);

    useEffect(() => {
        if (graphic?.length === 0) {
            setValue('from_time', '');
            setValue('to_time', '');
            setValue('race', 0);
            setValue('station_id', '');
        }

        if (openS && graphic?.length > 0) {
            const {work_begin, work_end, race_count, kpp1} = graphic[0];
            setValue('from_time', work_begin + '-' + work_end);
            setValue('to_time', work_end);
            setValue('race', race_count);
            setValue('station_id', kpp1);
        }
    }, [graphic]);

    return (
        <Dialog
            open={openS}
            // onClose={handleClose}
            fullWidth
            TransitionComponent={Transition}
            maxWidth="md"
            scroll="body"
            keepMounted
            className={styles.modal}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle className={styles.heading} id="scroll-dialog-title">
                <div className={styles.row}>
                    <p className={styles.title}>{t('add_order')}</p>
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
                                <div className={c('d_grid_4', 'gap_45')}>
                                    <div className="form__item__order">
                                        <p>{t('graphic')}</p>

                                        <InputController
                                            control={control}
                                            name="graphic"
                                            placeholder={t('graphic')}
                                            size="small"
                                            type="text"
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

                                <div className={c('d_grid_4', 'gap_45')}>
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

                                <div className={c('d_grid_4', 'gap_45')}>
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
                    <div className="flex__end">
                        <Button
                            className="btn__secondary"
                            onClick={() => {
                                setOpenS(false);
                            }}
                        >
                            {t('cancel')}
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

export default React.memo(SaveOrder);

{
    /* <div className="form__item__order">
<p>{t('time_to')}</p>
<InputController
    control={control}
    name="to_time"
    size="small"
    type="time"
    // errors={errors.garage_end_time?.type}
    // message={errors.garage_end_time?.message}
/>
</div> */
}

{
    /* <SelectController
control={control}
required={true}
name="driver_id"
isStatic
placeholder={t('driver_name')}
options={employeoptions}
styles={styles.input}
// errors={errors.region_id}
// message={errors.region_id}
/> */
}

{
    /* <SelectController
                                            control={control}
                                            required={true}
                                            name="graphic"
                                            placeholder={t('graphic')}
                                            options={graphicOptions}
                                            styles={styles.input}
                                            // errors={errors.region_id}
                                            // message={errors.region_id}
                                        /> */
}
