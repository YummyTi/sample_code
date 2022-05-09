import {Button, IconButton} from '@mui/material';
import React from 'react';
import {useTranslation} from 'react-i18next';

import MuiModal from '@shared/components/Modal';

import ExitCloseIcon from '@images/svgs/ExitCloseIcon';

type Props = {
    payload?: any;
    open: boolean;
    loading?: boolean;
    close: () => void;
    handleDelete: (payload?: any) => void;
};

const DeleteDialog: React.FC<Props> = ({
    payload,
    open,
    loading,
    close,
    handleDelete,
    children,
}) => {
    const {t} = useTranslation();

    return (
        <MuiModal open={open} handleClose={close}>
            <div className="modal__container">
                <div className="modal__header">
                    <h3>{t('are_you_sure_delete')}</h3>
                    <IconButton className="flex__one" onClick={close}>
                        <ExitCloseIcon />
                    </IconButton>
                </div>
                {children}
                <div className="modal__footer">
                    <Button
                        onClick={() => handleDelete(payload)}
                        color="error"
                        disabled={loading}
                        variant="contained"
                    >
                        {t('delete')}
                    </Button>
                    <Button onClick={close}>{t('cancel')}</Button>
                </div>
            </div>
        </MuiModal>
    );
};

export default DeleteDialog;
