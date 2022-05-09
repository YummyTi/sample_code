// @ts-nocheck
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useTable} from 'react-table';

type ProtocolEditTable = {
    columns: any;
    data: any;
    type: string;
    setData: (arg: any) => void;
    setUpdatedData: (arg: any) => void;
    updatedData: any;
};

type ProtocolTable = {
    type: string;
    data: any;
    setData: (data: any) => void;
    setUpdatedData: (data: any) => void;
    updatedData: any;
};

type ProtocolEditCell = {
    value: any;
    row: any;
    column: any;
    updateMyData: (index: number, id: number, value: string) => void;
};

const Table: React.FC<ProtocolEditTable> = ({
    columns,
    data,
    setData,
    setUpdatedData,
    updatedData,
}) => {
    const updateMyData = (index: number, id: string, value: number) => {
        console.log('Updater function');

        setUpdatedData([]);
        console.log('Index: ', index);
        console.log('ID: ', id);
        console.log('Value: ', value);
        if (
            data[index]?.mej_punkt &&
            data[index]?.naprav &&
            id === 'mej_punkt'
        ) {
            data[index].mej_punkt = value;
            for (let i = index; i < data.length; i++) {
                if (data[i].mej_punkt && data[i].naprav) {
                    data[i].naprav = +(
                        +data[i].mej_punkt + +data[i - 1].naprav
                    ).toFixed(2);
                    updatedData.push(data[i]);
                } else {
                    break;
                }
            }
        } else if (
            data[index].mej_punkt &&
            data[index].naprav &&
            id === 'naprav'
        ) {
            data[index].naprav = value;
            for (let i = index; i < data.length; i++) {
                if (data[i].mej_punkt && data[i].naprav) {
                    data[i].mej_punkt = +(
                        +data[i].naprav - +data[i - 1].naprav
                    ).toFixed(2);
                    updatedData.push(data[i]);
                } else {
                    break;
                }
            }
        }

        setData([...data]);
        console.log('Data: ', data);

        setUpdatedData([...new Set(updatedData)]);
    };

    const EditableCell: React.FC<ProtocolEditCell> = ({
        value: initialValue,
        row: {index},
        column: {id},
        updateMyData,
    }: any) => {
        const [value, setValue] = React.useState(initialValue);

        const onChange = (e: any) => {
            setValue(e.target.value);
        };

        const onBlur = () => {
            updateMyData(index, id, value);
        };

        React.useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        // onChange(e)

        return (
            <input
                value={value}
                type={'number'}
                disabled={index === 0}
                className={'tableInput'}
                onChange={(e) => {
                    onChange(e);
                }}
                onBlur={onBlur}
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
            // @ts-ignore
            updateMyData,
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

export const ProtocolTable: React.FC<ProtocolTable> = ({
    type,
    data,
    setData,
    setUpdatedData,
    updatedData,
}) => {
    const {t} = useTranslation();

    const columns = React.useMemo(
        () => [
            {
                Header: type === 'kpp1' ? t('kpp1') : t('kpp2'),
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
                        accessor: 'naprav',
                        className: 'table-text-center',
                    },
                ],
            },
        ],
        [t, data],
    );

    return (
        <Table
            columns={columns}
            type={type}
            data={data}
            setUpdatedData={setUpdatedData}
            updatedData={updatedData}
            setData={setData}
        />
    );
};
