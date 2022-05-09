import {yupResolver} from '@hookform/resolvers/yup';
import {Switch} from '@mui/material';
import cx from 'classnames';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import useAccessMutate from '@src/shared/api/access_rights/mutations';
import usePark from '@src/shared/api/park/hooks';
import useRegion from '@src/shared/api/region/hooks';
import useRoles from '@src/shared/api/role/hooks';
import DialogWrapper from '@src/shared/components/CustomDialog';
import InputController from '@src/shared/components/InputController';
import PasswordStatus from '@src/shared/components/PasswordStatus';
import SelectController from '@src/shared/components/SelectController';
import {useAccessStore} from '@src/shared/store/access_rights';
import {useMainStore} from '@src/shared/store/main';
import {useParkStore} from '@src/shared/store/park';
import {useRoleStore} from '@src/shared/store/role';

import {helper} from '@shared/helpers';

import styles from './index.module.scss';
import {UsersProps, usersScheme} from './schema';

const {handleOption} = helper;

const UserAdd = () => {
    const {t} = useTranslation();
    const {regionList} = useRegion();
    usePark();
    useRoles();
    const open = useMainStore((state) => state.open);
    const setOpen = useMainStore((state) => state.handleTap);
    const parks = useParkStore((state) => state.parks);
    const roles = useRoleStore((state) => state.roles);
    const setRefetchC = useAccessStore((state) => state.setRefetchCount);

    const [showP, setShowP] = useState(false);
    const [showPC, setShowPC] = useState(false);

    const {saveNewUser} = useAccessMutate();

    const optionAutomobile = useMemo(
        () => handleOption(parks, 'park', 'park_id'),
        [parks],
    );
    const optionRole = useMemo(() => handleOption(roles), [roles]);
    const optionRegions = useMemo(() => handleOption(regionList), [regionList]);

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<UsersProps>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(usersScheme),
    });

    const onSubmit = (data: UsersProps) => {
        console.log(data);
        saveNewUser.mutate({
            id: null,
            fullname: data.name,
            isActivated: data.active,
            login: data.login,
            parkList: data.automobile?.map((item: any) => +item.value),
            password: data.password,
            regionId: +data.region?.value,
            remark: data.name,
            roleId: +data.roleId?.value,
        });
    };

    useEffect(() => {
        if (saveNewUser.isSuccess) {
            handleClose();
            setRefetchC();
            reset();
        }
    }, [saveNewUser.isSuccess]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <DialogWrapper
            open={open}
            onClose={handleClose}
            title={t('add_user')}
            save={handleSubmit(onSubmit)}
            isForm
        >
            <div className={styles.block}>
                <div className="row">
                    <InputController
                        name="name"
                        control={control}
                        styles={cx('mui_textfield')}
                        size="small"
                        label={t('name')}
                        errors={errors.name?.type}
                        message={errors.name?.message}
                    />

                    <InputController
                        name="login"
                        control={control}
                        styles={cx('flex__end', 'mui__textfield')}
                        size="small"
                        label={t('login')}
                        errors={errors.login?.type}
                        message={errors.login?.message}
                    />
                </div>

                <InputController
                    name="password"
                    control={control}
                    required={true}
                    styles={cx('flex__end', 'mui__textfield')}
                    size="small"
                    type={!showP ? 'password' : 'text'}
                    endAdornment={
                        <PasswordStatus show={showP} setShow={setShowP} />
                    }
                    label={t('password')}
                    errors={errors.password?.type}
                    message={errors.password?.message}
                />
                <InputController
                    name="confirmPassword"
                    type={!showPC ? 'password' : 'text'}
                    required={true}
                    control={control}
                    endAdornment={
                        <PasswordStatus show={showPC} setShow={setShowPC} />
                    }
                    styles={cx('flex__end', 'mui__textfield')}
                    size="small"
                    errors={errors.confirmPassword?.type}
                    message={errors.confirmPassword?.message}
                    label={t('confirm_password')}
                />

                <SelectController
                    control={control}
                    required={true}
                    name="automobile"
                    placeholder={t('fixed_automobile')}
                    options={optionAutomobile}
                    errors={errors.automobile}
                    message={errors.automobile}
                    isMulti={true}
                />

                <SelectController
                    control={control}
                    required={true}
                    name="region"
                    placeholder={t('region')}
                    options={optionRegions}
                    errors={errors.region}
                    message={errors.region}
                />

                <SelectController
                    control={control}
                    required={true}
                    name="roleId"
                    placeholder={t('role')}
                    options={optionRole}
                    errors={errors.roleId}
                    message={errors.roleId}
                />

                <div className={styles.bottomContainer}>
                    <p className={styles.switchTitle}>{t('status_user')}</p>
                    <div className={styles.switchBlock}>
                        <p className={cx('text_field', styles.activeText)}>
                            {t('active')}
                        </p>
                        <Controller
                            control={control}
                            name="active"
                            render={({field: {onChange, value}}) => (
                                <Switch
                                    inputProps={{
                                        'aria-label': 'controlled',
                                    }}
                                    value={value}
                                    defaultChecked={false}
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

export default React.memo(UserAdd);
