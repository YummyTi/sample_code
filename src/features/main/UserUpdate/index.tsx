import {yupResolver} from '@hookform/resolvers/yup';
import Switch from '@mui/material/Switch';
import React, {useEffect, useMemo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import usePark from '@src/shared/api/park/hooks';
import useRoles from '@src/shared/api/role/hooks';
import DialogWrapper from '@src/shared/components/CustomDialog';
import {UserModel} from '@src/shared/models/users_model';

import useAccessMutate from '@api/access_rights/mutations';
import InputController from '@components/InputController';
import SelectController from '@components/SelectController';
import styles from '@features/automobile/AddAutomobile/index.module.scss';
import styles2 from '@features/main/UserAdd/index.module.scss';
import {
    UsersProps,
    UsersUpdateProps,
    usersScheme,
} from '@features/main/UserAdd/schema';
import {helper} from '@shared/helpers';
import {useMainStore} from '@shared/store/main';
import {useAccessStore} from '@store/access_rights';
import {useParkStore} from '@store/park';
import {useRegionStore} from '@store/region';
import {useRoleStore} from '@store/role';

import s from './index.module.scss';

const {handleOption} = helper;

const UpdateUserFormField = () => {
    usePark();
    useRoles();
    const selectedUsers = useAccessStore((state) => state.selectedUsers)[0];
    const roles = useRoleStore((state) => state.roles);
    const parks = useParkStore((state) => state.parks);
    const regions = useRegionStore((state) => state.regions);
    const optionRole = useMemo(() => handleOption(roles), [roles]);
    const optionAutomobile = useMemo(
        () => handleOption(parks, 'user_name', 'id'),
        [parks],
    );
    const optionRegions = useMemo(() => handleOption(regions), [regions]);

    const {handleOpenUpdate, openUpdate} = useMainStore(
        (state) => state,
        shallow,
    );

    const {t} = useTranslation();
    const {updateUserFunc} = useAccessMutate();
    const {
        control,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<UserModel>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(usersScheme),
    });

    useEffect(() => {
        if (selectedUsers) {
            Object.keys(selectedUsers).forEach(
                (key: keyof typeof selectedUsers) => {
                    setValue(key, selectedUsers[key]);
                },
            );
        }
    }, [selectedUsers]);

    const onSubmit = (data: UserModel) => {
        // updateUserFunc.mutate({
        //     id: data?.id,
        //     fullname: data?.fullname,
        //     login: data?.login,
        //     password: data?.password,
        //     confirmPassword: data?.confirmPassword,
        //     roleId: data?.roleId,
        //     parkList: data?.parkList,
        //     regionId: data?.regionId,
        //     remark: data?.remark,
        //     isActivated: data?.isActivated,
        // });
    };

    return (
        <DialogWrapper
            open={openUpdate}
            onClose={() => handleOpenUpdate(false)}
            title={t('change_user')}
            save={handleSubmit(onSubmit)}
        >
            <div className={s.formField}>
                <div className={s.login}>
                    <InputController
                        control={control}
                        name="fullname"
                        placeholder={t('name')}
                        size="small"
                        label={t('name')}
                        type="text"
                        styles={styles.input}
                        defaultValue={selectedUsers?.fullname || ''}
                        // errors={errors.name?.type}
                        // message={errors.name?.message}
                    />
                    <InputController
                        control={control}
                        name="login"
                        placeholder={t('login')}
                        size="small"
                        label={t('login')}
                        type="text"
                        styles={styles.input}
                        defaultValue={selectedUsers?.login || ''}
                        // errors={errors.garage_name?.type}
                        // message={errors.garage_name?.message}
                    />
                </div>
                <InputController
                    control={control}
                    name="password"
                    placeholder={t('password')}
                    size="small"
                    label={t('password')}
                    type="text"
                    styles={styles.input}
                    // errors={errors.license_number?.type}
                    // message={errors.license_number?.message}
                />
                <SelectController
                    control={control}
                    required={true}
                    name="roleId"
                    placeholder={t('role')}
                    options={optionRole}
                    // errors={errors.roleId}
                    // message={errors.roleId}
                />

                <SelectController
                    control={control}
                    required={true}
                    name="automobile"
                    placeholder={t('fixed_automobile')}
                    options={optionAutomobile}
                    // errors={errors.automobile}
                    // message={errors.automobile}
                    isMulti={true}
                />
                <SelectController
                    control={control}
                    required={true}
                    defaultValue={selectedUsers?.region}
                    name="region"
                    placeholder={t('region')}
                    options={optionRegions}
                    errors={errors.region}
                    message={errors.region}
                />
                <InputController
                    control={control}
                    name="remark"
                    placeholder={t('remark')}
                    size="small"
                    label={t('remark')}
                    type="text"
                    styles={styles.input}
                    defaultValue={selectedUsers?.remark || ''}
                    // errors={errors.remark?.type}
                    // message={errors.remark?.message}
                />
                <div className={styles2.bottomContainer2}>
                    <p className={styles2.switchTitle}>{t('status_user')}</p>
                    <div className={styles2.switchBlock}>
                        <Controller
                            control={control}
                            name="is_activated"
                            render={({field: {onChange, value}}) => (
                                <Switch
                                    inputProps={{
                                        'aria-label': 'controlled',
                                    }}
                                    value={value}
                                    defaultChecked={selectedUsers?.is_activated}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </DialogWrapper>
    );
};

export default UpdateUserFormField;
