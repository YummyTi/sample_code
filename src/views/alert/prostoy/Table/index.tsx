import {useCheckbox} from '@entities/selected-checkbox';
import RcTable from 'rc-table';
import React, {FC} from 'react';

import s from './index.module.scss';
import {IProstoy} from './model/data_model';
import {useColumns} from './model/useColumns';

const Table: FC = () => {
    const {isChecked, selected} = useCheckbox<IProstoy>();

    const {data, columns} = useColumns(selected);

    return (
        <RcTable
            columns={columns}
            data={data}
            rowKey={(r) => `${r.col1}`}
            className={s.table}
            rowClassName={(r) => (isChecked(r) ? s.trSelected : '')}
        />
    );
};

export default React.memo(Table);
