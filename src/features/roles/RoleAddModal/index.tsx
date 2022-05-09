import {yupResolver} from '@hookform/resolvers/yup';
import cx from 'classnames';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import useRoleMutate from '@src/shared/api/role/mutations';
import DialogWrapper from '@src/shared/components/CustomDialog';
import InputController from '@src/shared/components/InputController';
import {useMainStore} from '@src/shared/store/main';

import styles from './index.module.scss';
import {RolesProps, rolesScheme} from './schema';

const RoleAddModal = () => {
    const {t} = useTranslation();
    const open = useMainStore((state) => state.open);
    const setOpen = useMainStore((state) => state.handleTap);

    const {handleSaveRole} = useRoleMutate();

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<RolesProps>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(rolesScheme),
    });

    const onSubmit = (data: RolesProps) => {
        handleSaveRole.mutate({
            id: null,
            name: data.name,
            remark: data.remark,
        });
    };

    useEffect(() => {
        if (handleSaveRole.isSuccess) {
            setOpen(false);
            reset();
        }
    }, [handleSaveRole.isSuccess]);

    return (
        <DialogWrapper
            open={open}
            onClose={() => setOpen(false)}
            title={t('add_role')}
            save={handleSubmit(onSubmit)}
            isForm
            width="400px"
        >
            <div className={styles.container}>
                <InputController
                    name="name"
                    control={control}
                    required={true}
                    styles={cx('flex__end', 'mui__textfield')}
                    size="small"
                    label={t('name')}
                    errors={errors.name?.type}
                    message={errors.name?.message}
                />
                <InputController
                    name="remark"
                    required={true}
                    control={control}
                    styles={cx('flex__end', 'mui__textfield')}
                    size="small"
                    multiline
                    errors={errors.remark?.type}
                    message={errors.remark?.message}
                    label={t('remark')}
                />
            </div>
        </DialogWrapper>
    );
};

export default React.memo(RoleAddModal);
