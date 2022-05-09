import React from 'react';

import AuthForm from '@features/login/components/authForm';

import styles from './index.module.scss';

const Login = () => {
    return (
        <div className={styles.loginContainer}>
            <AuthForm />
        </div>
    );
};

export default Login;
