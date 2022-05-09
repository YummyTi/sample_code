import {IconButton} from '@mui/material';
import React, {FC} from 'react';
import {Cell} from 'react-table';

import {useApplyCoef} from '@api/diff_norm/mutations';
import {CoefModel} from '@models/diff_norm_models';

import SuccessIcon from '@images/svgs/SuccessIcon';

import s from './index.module.scss';

type Props = {
    cell: Cell<CoefModel>;
};

const ApplyButton: FC<Props> = ({cell: {row}}) => {
    const handleApply = useApplyCoef();

    const handleClick = () => handleApply.mutate(row.original.id);

    return (
        <IconButton className={s.applyBtn} onClick={handleClick}>
            <SuccessIcon className={s.applyIcon} />
        </IconButton>
    );
};

export default ApplyButton;
