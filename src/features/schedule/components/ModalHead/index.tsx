import IconButton from '@mui/material/IconButton';
import React from 'react';

import ExitCloseIcon from '@src/images/svgs/ExitCloseIcon';

import styles from './index.module.scss';

interface IProps {
    text: string;
    handleClose: () => void;
}

const ModalHead = ({text, handleClose}: IProps) => {
    return (
        <div className={styles.spaceBtw}>
            <p className={styles.headText}>{text}</p>
            <IconButton onClick={handleClose}>
                <ExitCloseIcon />
            </IconButton>
        </div>
    );
};

export default ModalHead;
