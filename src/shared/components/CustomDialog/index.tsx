import {LoadingButton} from '@mui/lab';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import CloseIcon from '@images/svgs/CloseIcon';

import s from './index.module.scss';

interface Props {
    open: boolean;
    onClose: () => void;
    title: string;
    save: () => void;
    isLoading?: boolean;
    contentStyles?: any;
    isForm?: boolean;
    saveLabel?: string;
    width?: string;
}

const DialogWrapper: FC<Props> = ({
    open,
    onClose,
    title,
    save,
    isLoading,
    children,
    contentStyles,
    isForm,
    saveLabel,
    width,
}) => {
    const {t} = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={
                width
                    ? {
                          '& .MuiDialog-container': {
                              '& .MuiPaper-root': {
                                  width: '100%',
                                  maxWidth: width,
                              },
                          },
                      }
                    : null
            }
        >
            <DialogTitle className={s.modalTitle}>
                <div className={s.header}>
                    <span className={s.title}>{title}</span>
                    <div>
                        <div className={s.icon}>
                            <IconButton onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </DialogTitle>

            <form onSubmit={isForm ? save : () => null}>
                <DialogContent className={contentStyles} dividers={true}>
                    {children}
                </DialogContent>

                <DialogActions>
                    <Button
                        className={s.btnCancel}
                        disabled={isLoading}
                        onClick={onClose}
                    >
                        {t('cancel')}
                    </Button>
                    <LoadingButton
                        type="submit"
                        className={s.btnSave}
                        variant="contained"
                        onClick={save}
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        {isLoading ? '' : saveLabel ? saveLabel : t('save')}
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DialogWrapper;
