import {ColumnsType} from 'rc-table/lib/interface';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {SelectedCheckbox} from '@src/entities/selected-checkbox';

import MultiSelect from '@components/Select';

import Input from '../Input';
import Select from '../Select';
import {IProstoy} from './data_model';

const userOptions = [
    {value: 'all', label: 'Все'},
    {value: 'marked', label: 'Отмеченные'},
    {value: 'unchecked', label: 'Неотмеченные'},
];

const statusOptions = [
    {value: 'all', label: 'Все'},
    {value: 'onPlace', label: 'стоит'},
    {value: 'left', label: 'проехал'},
];

export const useColumns = (selected: IProstoy[]) => {
    const {t} = useTranslation();

    const columns: ColumnsType<IProstoy> = useMemo(
        () => [
            {title: '№', dataIndex: 'col1', key: 'col1'},
            {
                title: <Select options={userOptions} />,
                key: 'all',
                render: (_, row) => <SelectedCheckbox row={row} />,
                width: 100,
            },
            {
                title: 'Пользователи',
                children: [
                    {
                        title: <Input />,
                        dataIndex: 'user',
                        key: 'user',
                        width: 230,
                    },
                ],
            },
            {
                title: 'Время вызова',
                children: [
                    {
                        title: <Input />,
                        dataIndex: 'call_time',
                        key: 'call_time',
                    },
                ],
            },
            {
                title: 'Статус',
                children: [{title: 'Все', dataIndex: 'status', key: 'status'}],
            },
            {
                title: 'Простой',
                children: [
                    {
                        title: 'Остановка',
                        children: [
                            {
                                title: <Input />,
                                dataIndex: 'station',
                                key: 'station',
                                width: 180,
                            },
                        ],
                    },
                    {
                        title: 'Встал от',
                        children: [
                            {
                                title: <Input />,
                                dataIndex: 'time_up',
                                key: 'time_up',
                                width: 90,
                            },
                        ],
                    },
                    {
                        title: 'Время простоя',
                        children: [
                            {
                                title: <Input />,
                                dataIndex: 'time_pause',
                                key: 'time_pause',
                            },
                        ],
                    },
                ],
            },
            {
                title: '№ парка',
                children: [
                    {
                        title: <Input />,
                        dataIndex: 'time_pause',
                        key: 'time_pause',
                        width: 90,
                    },
                ],
            },
            {
                title: '№ маршрута',
                children: [
                    {
                        title: <Input />,
                        dataIndex: 'time_pause',
                        key: 'time_pause',
                    },
                ],
            },
            {
                title: '№ гаража',
                children: [
                    {
                        title: <Input />,
                        dataIndex: 'time_pause',
                        key: 'time_pause',
                    },
                ],
            },
            {
                title: t('gos_number'),
                children: [
                    {
                        title: <Input />,
                        dataIndex: 'gos_number',
                        key: 'gos_number',
                        width: 150,
                    },
                ],
            },
            {
                title: t('phoneNumber'),
                children: [
                    {
                        title: <Input />,
                        dataIndex: 'phoneNumber',
                        key: 'phoneNumber',
                        width: 180,
                    },
                ],
            },
            {
                title: t('driver_name'),
                children: [
                    {
                        title: <Input />,
                        dataIndex: 'driver_name',
                        key: 'driver_name',
                        width: 180,
                    },
                ],
            },
            {
                title: t('tabel_number'),
                children: [
                    {
                        title: <Input />,
                        dataIndex: 'tabel_number',
                        key: 'tabel_number',
                    },
                ],
            },
            {
                title: 'Направление',
                children: [
                    {
                        title: <Input />,
                        dataIndex: 'direction',
                        key: 'direction',
                        width: 250,
                    },
                ],
            },
        ],
        [selected],
    );

    const data: IProstoy[] = useMemo(
        () =>
            Array(20)
                .fill(0)
                .map((_, index) => ({
                    col1: index + 1,
                    user: 'Иванов Иван Иванович',
                    call_time: '10:00',
                    status: 'Стоит',
                    station: 'Остановка №1',
                    time_up: '10:00',
                    time_pause: '10:00',
                    park_number: '10',
                    route_number: '10',
                    garage_number: '10',
                    gos_number: '10 111 AAA',
                    phoneNumber: '100 000 000',
                    driver_name: 'Asdum Asdumov Asdumovich',
                    tabel_number: '1000',
                    direction: 'Чорсу -> Югнакий',
                })),
        [],
    );

    return {columns, data};
};
