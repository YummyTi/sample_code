import {IconButton} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import {Cell} from 'react-table';

import {useDeleteCoef} from '@api/diff_norm/mutations';
import DeleteDialog from '@components/SureToDeleteDialog';
import {CoefModel} from '@models/diff_norm_models';

import TrashIcon from '@images/svgs/TrashIcon';

import s from './index.module.scss';

type Props = {
    cell: Cell<CoefModel>;
};

const DeleteButton: FC<Props> = ({cell: {row}}) => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState<number>();

    const handleDelete = useDeleteCoef();

    useEffect(() => {
        if (handleDelete.isSuccess) {
            setOpen(false);
        }
    }, [handleDelete.isSuccess]);

    const toggleModal = () => {
        setId(row.original.id);
        setOpen(!open);
    };

    return (
        <>
            <IconButton
                color="error"
                className={s.deleteBtn}
                onClick={toggleModal}
            >
                <TrashIcon className={s.icon} />
            </IconButton>

            <DeleteDialog
                open={open}
                close={() => setOpen(!open)}
                handleDelete={handleDelete.mutate}
                payload={{ids: [id]}}
                loading={handleDelete.isLoading}
            />
        </>
    );
};

export default DeleteButton;
