import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import MuiModal from '@src/shared/components/Modal';
import {useScheduleStore} from '@src/shared/store/schedule';

import ModalBody from '../ModalBody';
import ModalHead from '../ModalHead';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import IconButton from '@mui/material/IconButton';
import styles from './index.module.scss';

const ScheduleModal = () => {
    const {t} = useTranslation();
    const {openM, setOpenM} = useScheduleStore(
        (state) => ({...state}),
        shallow,
    );

    const handleClose = () => {
        setOpenM(false);
    };

    return (
        <MuiModal
            handleClose={() => {
                console.log('some');
            }}
            open={openM}
        >
            <div className={styles.mContainer}>
                <ModalHead text={t('edit_graphic')} handleClose={handleClose} />
                <ModalBody />
            </div>
        </MuiModal>
    );
};

export default ScheduleModal;
