import React from 'react';

import DataLoading from '@src/shared/hoc/DataLoading';

import LogsTable from '../LogsTable';

const LogsData = () => {
    const logsList = [
        {name: 'Вход в парк', date: '2020-05-01'},
        {name: 'Выход из парка', date: '2020-05-01'},
    ];
    return (
        <DataLoading loading={false} data={logsList}>
            <div className="page__body">
                <LogsTable />
            </div>
        </DataLoading>
    );
};

export default LogsData;
