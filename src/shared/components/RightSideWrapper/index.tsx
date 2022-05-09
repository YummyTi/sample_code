import {LoadingButton} from '@mui/lab';
import {Button, IconButton} from '@mui/material';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import useLocationPermission from '@shared/hooks/useLocationPermission';

import EditIcon from '@images/svgs/EditIcon';
import ExitCloseIcon from '@images/svgs/ExitCloseIcon';
import TrashIcon from '@images/svgs/TrashIcon';

import s from './index.module.scss';

interface Props {
    title: string;
    onEdit?: () => void;
    handleClose: () => void;
    onDelete: () => void;
    hideEdit?: boolean;
    isEditable?: boolean;
    handleCancel?: () => void;
    isLoading?: boolean;
}

const RightSideWrapper: FC<Props> = ({
    title,
    onEdit,
    handleClose,
    onDelete,
    hideEdit,
    isEditable,
    handleCancel,
    isLoading,
    children,
}) => {
    const {t} = useTranslation();
    const {canEdit, canDelete} = useLocationPermission();

    return (
        <div className={s.container}>
            <div>
                <div className={s.header}>
                    <span className={s.title}>{title}</span>
                    <IconButton size="small" onClick={handleClose}>
                        <ExitCloseIcon className={s.exitIcon} />
                    </IconButton>
                </div>
                {children}
            </div>
            {!isEditable ? (
                <div className={s.footer}>
                    {canEdit && !hideEdit && (
                        <Button
                            onClick={onEdit}
                            fullWidth
                            className={s.editBtn}
                        >
                            <EditIcon />
                            {t('alternate')}
                        </Button>
                    )}
                    {canDelete && (
                        <Button
                            onClick={onDelete}
                            fullWidth
                            variant="contained"
                            className={s.deleteBtn}
                            color="error"
                        >
                            <TrashIcon />
                            {t('delete')}
                        </Button>
                    )}
                </div>
            ) : (
                <div className={s.footer}>
                    <Button
                        className={s.cancelBtn}
                        fullWidth
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        {t('cancel')}
                    </Button>
                    <LoadingButton
                        className={s.saveBtn}
                        fullWidth
                        type="submit"
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        {isLoading ? '' : t('save')}
                    </LoadingButton>
                </div>
            )}
        </div>
    );
};

export default RightSideWrapper;
