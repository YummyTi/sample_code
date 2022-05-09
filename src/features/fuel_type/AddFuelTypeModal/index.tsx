import {yupResolver} from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import cx from 'classnames';
import React, {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import useBusModelMutate from '@api/bus_model/mutations';
import InputController from '@components/InputController';
import styles from '@features/automobile/AddAutomobile/index.module.scss';
import {
    UpdateVehicleModelProps,
    vehicleModelUpdateScheme,
} from '@features/bus_model_page/BusModelUpdate/schema';
import {useAccessStore} from '@store/access_rights';
import {useBusModelStore} from '@store/bus_model';
import {useMainStore} from '@store/main';

import CloseIcon from '@images/svgs/CloseIcon';

const AddFuelType = () => {
    const {t} = useTranslation();
    const open = useMainStore((state) => state.open);
    const setOpen = useMainStore((state) => state.handleTap);
    const setRefetchC = useAccessStore((state) => state.setRefetchCount);
    const selectedFuelType = useBusModelStore(
        (state) => state.selectedFuelType,
    )[0];
    console.log('Added: ', selectedFuelType);

    const {handleSaveFuelType} = useBusModelMutate();

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
    } = useForm<UpdateVehicleModelProps>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(vehicleModelUpdateScheme),
    });

    const onSubmit = (data: UpdateVehicleModelProps) => {
        console.log('DATA: ', data);
        setTimeout(() => {
            handleSaveFuelType.mutate({
                id: selectedFuelType?.id,
                name: data?.name,
                remark: data?.remark,
                type_of_fuel: 1,
            });
        }, 100);
    };

    useEffect(() => {
        if (handleSaveFuelType.isSuccess) {
            handleClose();
            setRefetchC();
            reset({name: '', remark: ''});
        }
    }, [handleSaveFuelType.isSuccess]);

    const handleClose = useCallback(() => {
        reset();
        setOpen(false);
        reset({name: '', remark: ''});
    }, [reset]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                    <p className={styles.title}>Добавить модель топлива</p>
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
                                <InputController
                                    control={control}
                                    name="name"
                                    placeholder={t('name')}
                                    size="small"
                                    label={t('name')}
                                    type="text"
                                    styles={styles.input}
                                    errors={errors.name?.type}
                                    message={errors.name?.message}
                                />

                                <InputController
                                    control={control}
                                    name="remark"
                                    placeholder={t('description')}
                                    size="small"
                                    label={t('description')}
                                    type="text"
                                    styles={styles.input}
                                    message={errors.remark?.message}
                                    errors={errors.remark?.type}
                                />
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button className="btn__secondary" onClick={handleClose}>
                        {t('cancel')}
                    </Button>
                    <Button
                        variant="contained"
                        className={cx('btn__primary', styles?.formBtn, [
                            handleSaveFuelType.isLoading ? 'btn__disabled' : '',
                        ])}
                        type="submit"
                        fullWidth={false}
                        disabled={handleSaveFuelType.isLoading}
                    >
                        {t('save')}
                        {handleSaveFuelType.isLoading && (
                            <CircularProgress size={15} />
                        )}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default React.memo(AddFuelType);
