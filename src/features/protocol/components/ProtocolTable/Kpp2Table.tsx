// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';
import {useTable} from 'react-table';
import shallow from 'zustand/shallow';

import {useProtocolData} from '@src/shared/api/protocol_table/hooks';
import {useKPPStore} from '@src/shared/store/protocol';

type ProtocolEditTable = {
    columns: any;
    data: any;
    type: string;
    setData: (arg: any) => void;
};

type ProtocolTable = {
    type: string;
};

type ProtocolEditCell = {
    value: any;
    row: any;
    column: any;
    updateMyData: (index: number, id: number, value: string) => void;
};

const Table: React.FC<ProtocolEditTable> = ({columns, data, setData}) => {
    console.log('KPP2 data: ', data);

    const sumValues = (index: number, id: string, value: number) => {
        console.log('Sum values KPP2: ', data);

        if (
            data[index + 1]?.mej_punkt &&
            data[index + 1]?.distance &&
            id === 'mej_punkt'
        ) {
            data[index].mej_punkt = value;
            for (let i = index; i < data.length; i++) {
                if (data[i].mej_punkt && data[i].distance) {
                    data[i].distance =
                        +data[i].mej_punkt + +data[i - 1].distance;
                } else {
                    break;
                }
            }
        } else if (
            data[index + 1].mej_punkt &&
            data[index + 1].distance &&
            id === 'distance'
        ) {
            data[index].distance = value;
            for (let i = index; i < data.length; i++) {
                if (data[i].mej_punkt && data[i].distance) {
                    data[i].mej_punkt =
                        +data[i].distance - +data[i - 1].distance;
                } else {
                    break;
                }
            }
        }
        setData([...data]);
    };

    const onChange = (e: any, index: number, id: string) => {
        sumValues(index, id, +e.target.value);
    };

    const EditableCell: React.FC<ProtocolEditCell> = ({
        value: initialValue,
        row: {index},
        column: {id},
    }) => {
        const [value, setValue] = React.useState(initialValue);

        React.useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        return (
            <input
                value={value}
                type={'number'}
                disabled={index === 0}
                className={'tableInput'}
                onChange={(e) => onChange(e, index, id)}
            />
        );
    };

    const defaultColumn = {
        Cell: EditableCell,
    };

    const {getTableProps, getTableBodyProps, headerGroups, prepareRow, rows} =
        useTable({
            columns,
            data,
            defaultColumn,
        });
    return (
        <div className={'vehicleRouteTableWrapper'}>
            <table className={'routeEditTable'} {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);

                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            style={
                                                cell.column.id !==
                                                'station_name'
                                                    ? {textAlign: 'center'}
                                                    : {paddingLeft: 10}
                                            }
                                            {...cell.getCellProps([{}])}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

interface LocationState {
    state: {
        routeId: number;
    };
}

export const Kpp2Table: React.FC<ProtocolTable> = ({type}) => {
    const {t} = useTranslation();

    const location = useLocation();
    const {state} = location as LocationState;
    const {kpp2Data, setKpp2} = useKPPStore((state) => ({...state}), shallow);

    const columns = React.useMemo(
        () => [
            {
                Header: t('kpp1'),
                columns: [
                    {
                        Header: '№',
                        accessor: 'id',
                        className: 'table-text-center',
                        Cell: (props: any) => props.value,
                    },
                    {
                        Header: t('station_name'),
                        accessor: 'station_name',
                        className: 'stationNameCell',
                        Cell: (props: any) => props.value,
                    },
                    {
                        Header: t('between_points'),
                        accessor: 'mej_punkt',
                        className: 'table-text-center',
                    },
                    {
                        Header: t('distance_by_direction'),
                        accessor: 'distance',
                        className: 'table-text-center',
                    },
                ],
            },
        ],
        [t],
    );

    return (
        <Table
            columns={columns}
            type={type}
            data={kpp2Data}
            setData={setKpp2}
        />
    );
};
