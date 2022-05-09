import cx from 'classnames';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useAuthPermit from '@src/shared/api/auth/hooks';
import useAuthReq from '@src/shared/api/auth/mutations';
import ButtonM from '@src/shared/components/Button';
import InputController from '@src/shared/components/InputController';
import {VERSION} from '@src/shared/constants';
import {useAuthStore} from '@src/shared/store/auth';

import LogoHead from '../LogoHead';
import styles from './index.module.scss';
import PasswordAdornment from './PasswordAdornment';
import {FormProps} from './types';

const AuthForm = () => {
    const {handleLogin} = useAuthReq();
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const {isLoading} = useAuthPermit();
    const {loadingLogin, setLoadingLogin} = useAuthStore(
        (state) => ({...state}),
        shallow,
    );
    const {t} = useTranslation();

    const disableBtn = isLoading || handleLogin.isLoading || loadingLogin;

    const showPassword = useAuthStore(
        useCallback((state) => state.showPassword, []),
    );

    const handleType = useMemo(() => {
        if (showPassword) {
            return 'text';
        } else {
            return 'password';
        }
    }, [showPassword]);

    const handleTarget = (target: 'login' | 'password') => {
        switch (target) {
            case 'login':
                loginRef.current?.focus();
                break;
            case 'password':
                passwordRef.current?.focus();
            default:
                break;
        }
    };

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<FormProps>({
        mode: 'onBlur',
        shouldFocusError: true,
    });

    useEffect(() => {
        window.addEventListener('load', () => {
            setLoadingLogin(false);
        });
    }, []);

    // console.log(errors, 'errors');
    const onSubmit = (data: FormProps) => {
        handleLogin.mutate(data);
        // setLoadingLogin(true);
    };

    return (
        <div className={styles.container}>
            <LogoHead />
            <div className={styles.mainTitle}>
                <h4 className={styles.titlement}>Войти</h4>
                <p className={styles.description}>
                    Введите логин и пароль ниже
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.formContainer}
            >
                <div className={styles.formDiv}>
                    <div
                        onClick={() => handleTarget('login')}
                        className={styles.label}
                    >
                        <p className={styles.labelText}>Логин</p>
                    </div>

                    <InputController
                        control={control}
                        name="login"
                        required={true}
                        placeholder="Логин"
                        size="small"
                        inputRef={loginRef}
                        type="text"
                        styles={styles.input}
                        errors={!!errors.login?.type}
                    />
                </div>

                <div className={styles.formDiv}>
                    <div className={styles.label}>
                        <p
                            onClick={() => handleTarget('password')}
                            className={styles.labelText}
                        >
                            пароль
                        </p>
                        <p className={styles.subLabelText}>Забыли пароль?</p>
                    </div>
                    <InputController
                        control={control}
                        name="password"
                        required={true}
                        endAdornment={<PasswordAdornment />}
                        placeholder="Пароль"
                        size="small"
                        inputRef={passwordRef}
                        type={handleType}
                        styles={styles.input}
                        errors={!!errors.password?.type}
                    />
                </div>

                {/* <div className={styles.formDiv}> */}
                {/* <InputController
                        control={control}
                        name="autoNumber"
                        required={true}
                        placeholder="AutoNumber"
                        size="small"
                        // inputRef={loginRef}
                        type="text"
                        masked
                        styles={styles.input}
                        errors={!!errors.autoNumber?.type}
                    /> */}
                {/* </div> */}

                <ButtonM
                    type="submit"
                    variant="contained"
                    text="Войти"
                    className={cx(
                        styles.formbtn,
                        disableBtn && styles.disableBtn,
                    )}
                    loading={disableBtn}
                />
                <div className={styles.footer}>
                    <div className={styles.footText}>
                        {t('version')}: {VERSION.V1.toFixed(1)}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
