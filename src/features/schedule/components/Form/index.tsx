import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import InputController from '@components/InputController';
import MuiModal from '@components/Modal';
import {SelectForm} from '@features/passport/components/InputForms/SelectForm';
import {FormProps} from '@features/schedule/components/Form/schema';
import useFormAction from '@features/schedule/components/Form/useFormAction';
import useHandleForm from '@features/schedule/components/Form/useHandleForm';
import {helper} from '@shared/helpers';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {useKppStore} from '@store/kpp';
import {useScheduleStore} from '@store/schedule';

import ExitCloseIcon from '@images/svgs/ExitCloseIcon';

const {handleOption} = helper;

const Form = () => {
    const [ddel, setDdel] = useState<boolean>(false);
    const {canDelete} = useLocationPermission('routes');

    const {t} = useTranslation();
    const {handleSave, handleAddSchedule, handleDelete, deleteSchedules} =
        useHandleForm();
    const {control, reset, errors, handleSubmit} = useFormAction();
    const {setOpenM, step, setStep, stepData, update} = useScheduleStore(
        (state) => ({...state}),
        shallow,
    );
    const {kppById} = useKppStore((state) => state, shallow);

    const kppsOptions = useMemo(() => {
        return handleOption(kppById, 'name', 'id');
    }, [kppById]);

    const handleClose = () => {
        setOpenM(false);
        setStep(0);
        reset();
    };

    const onSubmit = (data: FormProps) => {
        handleSave(data);
    };

    const openAdmitModal = () => {
        console.log(stepData, 'open delete modal');
        setDdel(true);
    };

    useEffect(() => {
        if (deleteSchedules.isSuccess) {
            setDdel(false);
            setOpenM(false);
        }
    }, [deleteSchedules.isSuccess]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="form__body">
                    {/* First Column */}
                    <div className="form__col">
                        <div className="form__item">
                            <h4>{t('race')}</h4>
                            <InputController
                                control={control}
                                name="race_count"
                                placeholder={t('race')}
                                size="small"
                                type="number"
                                errors={errors.race_count?.type}
                                message={errors.race_count?.message}
                            />
                        </div>

                        <div className="form__caption">
                            <h4>{t('working_hours')}</h4>
                            <div className="form__item">
                                <p>{t('departure')}</p>
                                <InputController
                                    control={control}
                                    name="garage_begin_time"
                                    size="small"
                                    type="time"
                                    errors={errors.garage_begin_time?.type}
                                    message={errors.garage_begin_time?.message}
                                />
                            </div>
                            <div className="form__item">
                                <p>{t('check_in')}</p>
                                <InputController
                                    control={control}
                                    name="garage_end_time"
                                    size="small"
                                    type="time"
                                    errors={errors.garage_end_time?.type}
                                    message={errors.garage_end_time?.message}
                                />
                            </div>
                        </div>

                        <div className="form__caption">
                            <h4>{t('begin_work')}</h4>
                            <div className="form__item">
                                <p>{t('time')}</p>
                                <InputController
                                    control={control}
                                    name="kpp_begin_time"
                                    size="small"
                                    type="time"
                                    errors={errors.kpp_begin_time?.type}
                                    message={errors.kpp_begin_time?.message}
                                />
                            </div>
                            <div className="form__item">
                                <SelectForm
                                    label={t('busStop')}
                                    options={kppsOptions}
                                    //@ts-ignore
                                    control={control}
                                    name="kpp_begin"
                                    placeholder={t('busStop')}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Second Column  */}
                    <div className="form__col">
                        <div className="form__item">
                            <p>{t('simple')}</p>
                            <InputController
                                control={control}
                                name="prostoy"
                                placeholder={t('simple')}
                                size="small"
                                type="number"
                                errors={errors.prostoy?.type}
                                message={errors.prostoy?.message}
                            />
                        </div>

                        <div className="form__item">
                            <p>{t('interval')}</p>
                            <InputController
                                control={control}
                                name="interval"
                                placeholder={t('interval')}
                                size="small"
                                type="number"
                                errors={errors.interval?.type}
                                message={errors.interval?.message}
                            />
                        </div>

                        <div className="form__caption">
                            <h4>{t('end_work')}</h4>
                            <div className="form__item">
                                <p>{t('time')}</p>
                                <InputController
                                    control={control}
                                    name="kpp_end_time"
                                    size="small"
                                    type="time"
                                    errors={errors.kpp_end_time?.type}
                                    message={errors.kpp_end_time?.message}
                                />
                            </div>
                            <div className="form__item">
                                {/* <p>{t('busStop')}</p> */}
                                <SelectForm
                                    label={t('busStop')}
                                    options={kppsOptions}
                                    //@ts-ignore
                                    control={control}
                                    name="kpp_end"
                                    placeholder={t('busStop')}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Third Column  */}
                    <div className="form__col">
                        <div className="form__caption">
                            <h4>{t('lunch_time')}</h4>

                            <div className="form__row">
                                <div className="form__item">
                                    <p>{t('from')}</p>
                                    <InputController
                                        control={control}
                                        name="lunch1_begin"
                                        size="small"
                                        // styles={}
                                        type="time"
                                        errors={errors.lunch1_begin?.type}
                                        message={errors.lunch1_begin?.message}
                                    />
                                </div>
                                <div className="form__item">
                                    <p>{t('to')}</p>
                                    <InputController
                                        control={control}
                                        name="lunch1_end"
                                        size="small"
                                        // styles={}
                                        type="time"
                                        errors={errors.lunch1_end?.type}
                                        message={errors.lunch1_end?.message}
                                    />
                                </div>
                            </div>
                            <div className="form__item">
                                <SelectForm
                                    label={t('busStop')}
                                    options={kppsOptions}
                                    //@ts-ignore
                                    control={control}
                                    name="kpp_lunch1"
                                    placeholder={t('busStop')}
                                />
                            </div>
                        </div>
                        {/* next side  */}
                        <div className="form__caption">
                            <h4>{t('lunch_time')} 2</h4>

                            <div className="form__row">
                                <div className="form__item">
                                    <p>{t('from')}</p>
                                    <InputController
                                        control={control}
                                        name="lunch2_begin"
                                        size="small"
                                        // styles={}
                                        type="time"
                                        errors={errors.lunch2_begin?.type}
                                        message={errors.lunch2_begin?.message}
                                    />
                                </div>
                                <div className="form__item">
                                    <p>{t('to')}</p>
                                    <InputController
                                        control={control}
                                        name="lunch2_end"
                                        size="small"
                                        // styles={}
                                        type="time"
                                        errors={errors.lunch2_end?.type}
                                        message={errors.lunch2_end?.message}
                                    />
                                </div>
                            </div>
                            <div className="form__item">
                                <SelectForm
                                    label={t('busStop')}
                                    options={kppsOptions}
                                    //@ts-ignore
                                    control={control}
                                    name="kpp_lunch2"
                                    placeholder={t('busStop')}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form__footer">
                    <Button onClick={handleClose} className="btn__outline">
                        {t('cancel')}
                    </Button>

                    {/* on hold, don`t know if we can delete or not */}
                    {/* {canDelete && (
                        <Button
                            variant="contained"
                            color="error"
                            className="btn__delete"
                            onClick={openAdmitModal}
                        >
                            {t('delete')}
                        </Button>
                    )} */}
                    <Button
                        disabled={handleAddSchedule.isLoading}
                        type="submit"
                        className="btn__primary"
                    >
                        {handleAddSchedule.isLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : step === 3 ? (
                            t('save')
                        ) : (
                            t('continue')
                        )}
                    </Button>
                </div>
            </form>
            {/* <MuiModal
                open={ddel}
                handleClose={() => {
                    setDdel(false);
                }}
            >
                <div className="modal__container">
                    <div className="modal__header">
                        <h3>{t('are_you_sure_delete')}</h3>
                        <IconButton
                            className="flex__one"
                            onClick={() => {
                                setDdel(false);
                            }}
                        >
                            <ExitCloseIcon />
                        </IconButton>
                    </div>
                    <div className="modal__footer">
                        <Button
                            onClick={() =>
                                handleDelete({id: stepData[0]?.schedule_id})
                            }
                            color="error"
                            disabled={deleteSchedules.isLoading}
                            variant="contained"
                        >
                            {t('delete')}
                        </Button>
                        <Button onClick={() => setDdel(false)}>
                            {t('cancel')}
                        </Button>
                    </div>
                </div>
            </MuiModal> */}
        </>
    );
};

export default Form;
