import cl from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {dataMock} from './mockData';

const useLogData = () => {
    const {t} = useTranslation();
    const data = dataMock;

    const handleAction = (val: number) => {
        if (val === 1) {
            return 'Добавила';
        } else if (val === 2) {
            return 'Изменила';
        } else {
            return 'Удалила';
        }
    };

    const columns: any = React.useMemo(
        () => [
            {
                Header: '№',
                accessor: 'index',
            },
            {
                Header: t('users'),
                accessor: 'name',
            },
            {
                Header: t('time'),
                accessor: 'time',
            },
            {
                Header: 'IP',
                accessor: 'ip',
            },
            {
                Header: t('action'),
                accessor: 'action',
                Cell: (props: any) => {
                    const {time, name} = props.row.original;
                    return (
                        <div>
                            grafist{' '}
                            <span
                                className={cl([
                                    props.value === 1
                                        ? 'green'
                                        : props.value === 2
                                        ? 'yellow'
                                        : 'red',
                                ])}
                            >
                                {handleAction(props.value)}
                            </span>{' '}
                            {name} {time}
                        </div>
                    );
                },
            },
        ],
        [t],
    );

    return {
        columns,
        data,
    };
};

export default useLogData;
