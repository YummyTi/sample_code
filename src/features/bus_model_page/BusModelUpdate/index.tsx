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
import shallow from 'zustand/shallow';

import CloseIcon from '@src/images/svgs/CloseIcon';
import DialogWrapper from '@src/shared/components/CustomDialog';
import {useMainStore} from '@src/shared/store/main';

import useBusModelMutate from '@api/bus_model/mutations';
import InputController from '@components/InputController';
import styles from '@features/automobile/AddAutomobile/index.module.scss';
import {useAccessStore} from '@store/access_rights';
import {useBusModelStore} from '@store/bus_model';

import {UpdateVehicleModelProps, vehicleModelUpdateScheme} from './schema';

const BusModelUpdate = () => {
    const {t} = useTranslation();
    const {handleOpenUpdate, openUpdate} = useMainStore(
        (state) => state,
        shallow,
    );
    const setRefetchC = useAccessStore((state) => state.setRefetchCount);
    const selectedBusModel = useBusModelStore(
        (state) => state.selectedBusModel,
    )[0];
    const setSelectedBusModel = useBusModelStore(
        (state) => state.setSelectedBusModel,
    );

    const {handleSaveBusModel} = useBusModelMutate();

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
        setSelectedBusModel([]);
        setTimeout(() => {
            handleSaveBusModel.mutate({
                id: selectedBusModel?.id,
                name: data?.name,
                remark: data?.remark,
                type_of_fuel: 1,
            });
        }, 100);
    };

    useEffect(() => {
        if (selectedBusModel) {
            setValue('name', selectedBusModel.name);
            setValue('remark', selectedBusModel.remark);
        }
    }, [selectedBusModel]);

    useEffect(() => {
        if (handleSaveBusModel.isSuccess) {
            handleClose();
            setRefetchC();
            reset({name: '', remark: ''});
        }
    }, [handleSaveBusModel.isSuccess]);

    const handleClose = useCallback(() => {
        handleOpenUpdate(false);
        setSelectedBusModel([]);
        reset({name: '', remark: ''});
    }, []);

    return (
        <DialogWrapper
            open={openUpdate}
            onClose={handleClose}
            title="Изменить модель"
            save={handleSubmit(onSubmit)}
            isForm
            width="450px"
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
                            defaultValue={selectedBusModel?.name || ''}
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
                            defaultValue={selectedBusModel?.remark || ''}
                        />
                    </div>
                </div>
            </div>
        </DialogWrapper>
    );
};

export default React.memo(BusModelUpdate);
