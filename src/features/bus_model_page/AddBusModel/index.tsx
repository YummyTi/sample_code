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

import CloseIcon from '@src/images/svgs/CloseIcon';
import DialogWrapper from '@src/shared/components/CustomDialog';
import InputController from '@src/shared/components/InputController';

import useBusModelMutate from '@api/bus_model/mutations';
import styles from '@features/automobile/AddAutomobile/index.module.scss';
import {useAccessStore} from '@store/access_rights';
import {useBusModelStore} from '@store/bus_model';
import {useMainStore} from '@store/main';

import {
    UpdateVehicleModelProps,
    vehicleModelUpdateScheme,
} from '../BusModelUpdate/schema';

const AddBusModel = () => {
    const {t} = useTranslation();
    const open = useMainStore((state) => state.open);
    const setOpen = useMainStore((state) => state.handleTap);
    const setRefetchC = useAccessStore((state) => state.setRefetchCount);
    const selectedFuelType = useBusModelStore(
        (state) => state.selectedFuelType,
    )[0];

    const {handleSaveBusModel} = useBusModelMutate();

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<UpdateVehicleModelProps>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(vehicleModelUpdateScheme),
    });

    const onSubmit = (data: UpdateVehicleModelProps) => {
        console.log('DATA: ', data);
        setTimeout(() => {
            handleSaveBusModel.mutate({
                id: selectedFuelType?.id,
                name: data?.name,
                remark: data?.remark,
                type_of_fuel: 1,
            });
        }, 100);
    };

    useEffect(() => {
        if (handleSaveBusModel.isSuccess) {
            handleClose();
            setRefetchC();
            reset({name: '', remark: ''});
        }
    }, [handleSaveBusModel.isSuccess]);

    const handleClose = useCallback(() => {
        reset();
        setOpen(false);
        reset({name: '', remark: ''});
    }, [reset]);

    return (
        <DialogWrapper
            open={open}
            onClose={handleClose}
            title="Добавить модель"
            save={handleSubmit(onSubmit)}
            isForm
            width="500px"
        >
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
        </DialogWrapper>
    );
};

export default React.memo(AddBusModel);
