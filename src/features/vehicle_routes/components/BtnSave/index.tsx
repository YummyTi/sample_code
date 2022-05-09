import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import {useTranslation} from 'react-i18next';

import styles from './index.module.scss';

interface IProps {
    disabled?: boolean;
    loading?: boolean;
    handleSave: () => void;
}

const BtnSave = ({handleSave, disabled, loading}: IProps) => {
    const {t} = useTranslation();
    return (
        <div className={styles.container}>
            <Button
                disabled={disabled}
                className={styles.btnPrimary}
                onClick={handleSave}
            >
                {loading ? (
                    <CircularProgress color="inherit" size={25} />
                ) : (
                    t('save')
                )}
            </Button>
        </div>
    );
};

export default BtnSave;
