//@ts-nocheck
import {Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useTable} from 'react-table';
import shallow from 'zustand/shallow';

import {useExampleStore} from '@src/shared/store/example';

import styles from './index.module.scss';

const borderStyle = {
    border: '1px solid gray',
    padding: '8px 10px',
    marginTop: '15px',
};

function useInstance(instance: {allColumns: any}) {
    const {allColumns} = instance;

    let rowSpanHeaders: any[] = [];

    allColumns.forEach((column: {id: any; enableRowSpan: any}, i: any) => {
        const {id, enableRowSpan} = column;

        if (enableRowSpan !== undefined) {
            rowSpanHeaders = [
                ...rowSpanHeaders,
                {id, topCellValue: null, topCellIndex: 0},
            ];
        }
    });

    Object.assign(instance, {rowSpanHeaders});
}

const RowSpanTable = () => {
    const {origData, setOrigData} = useExampleStore(
        (state) => ({...state}),
        shallow,
    );

    const [newData, setNewData] = useState<any[]>([]);

    useEffect(() => {
        const myData: Array<Data> = [];
        origData.forEach((actorObj) => {
            actorObj.days.forEach((movie) => {
                myData.push({
                    ...movie,
                    id: actorObj.id,
                });
                // console.log(myData, 'my data');
            });
        });

        setNewData([...myData]);
    }, [origData]);

    console.log(origData, 'newData');

    const handleAdd = () => {
        setOrigData({
            id: origData[origData.length - 1].id + 1,
            days: origData[origData.length - 1].days,
        });
    };

    const data = React.useMemo(() => newData, [newData]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'График',
                // accessor: 'id',
                enableRowSpan: true,
                rowSpan: 2,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: 'id',
                        enableRowSpan: true,
                        displayNone: true,
                    },
                ],
            },
            {
                Header: 'Дни',
                accessor: 'day',
                rowSpan: 2,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: 'day',
                        displayNone: true,
                    },
                ],
            },
            {
                Header: 'Рейс',
                accessor: 'race',
                rowSpan: 2,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: 'race',
                        displayNone: true,
                    },
                ],
            },
            {
                Header: 'Время работы',
                columns: [
                    {
                        Header: 'Выезд',
                        accessor: 'exit',
                    },
                    {
                        Header: 'Заезд',
                        accessor: 'comeback',
                    },
                ],
            },
            {
                Header: 'Начало работы',
                columns: [
                    {
                        Header: 'Время',
                        accessor: 'time',
                    },
                    {
                        Header: 'Остоновка',
                        accessor: 'busStop',
                    },
                ],
            },
            {
                Header: 'Окончание работы',
                columns: [
                    {
                        Header: 'Время',
                        accessor: 'timeEnd',
                    },
                    {
                        Header: 'Остоновка',
                        accessor: 'busStopEnd',
                    },
                ],
            },
            {
                Header: 'Простой',
                accessor: 'simple',
                rowSpan: 2,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: 'simple',
                        displayNone: true,
                    },
                ],
            },
            {
                Header: 'Интервал',
                accessor: 'interval',
                rowSpan: 2,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: 'interval',
                        displayNone: true,
                    },
                ],
            },
            {
                Header: 'Время обеда',
                columns: [
                    {
                        Header: 'от',
                        accessor: 'lunchFrom',
                    },
                    {
                        Header: 'до',
                        accessor: 'lunchTo',
                    },
                    {
                        Header: 'Остоновка',
                        accessor: 'busLunchStop',
                    },
                ],
            },
            {
                Header: 'Время обеда 2',
                columns: [
                    {
                        Header: 'от',
                        accessor: 'dinnerFrom',
                    },
                    {
                        Header: 'до',
                        accessor: 'dinnerhTo',
                    },
                    {
                        Header: 'Остоновка',
                        accessor: 'busDinnerStop',
                    },
                ],
            },
        ],
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        //@ts-ignore
        rows,
        prepareRow,
        //@ts-ignore
        rowSpanHeaders,
    } = useTable(
        {
            //@ts-ignore
            columns,
            data,
        },
        (hooks) => {
            hooks.useInstance.push(useInstance);
        },
    );

    return (
        <div className={'vehicleRouteTableWrapper'}>
            <table className={'routeEditTable'} {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    rowSpan={`${column.rowSpan ?? 1}`}
                                    // style={borderStyle}
                                    style={
                                        column.displayNone
                                            ? {display: 'none', ...borderStyle}
                                            : borderStyle
                                    }
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: any, i) => {
                        prepareRow(row);

                        for (let j = 0; j < row.allCells.length; j++) {
                            const cell = row.allCells[j];
                            const rowSpanHeader = rowSpanHeaders.find(
                                (x: {id: string | number}) =>
                                    x.id === cell.column.id,
                            );

                            // @ts-ignore
                            if (rowSpanHeader !== undefined) {
                                if (
                                    rowSpanHeader.topCellValue === null ||
                                    rowSpanHeader.topCellValue !== cell.value
                                ) {
                                    //@ts-ignore
                                    cell.isRowSpanned = false;
                                    rowSpanHeader.topCellValue = cell.value;
                                    rowSpanHeader.topCellIndex = i;
                                    //@ts-ignore
                                    cell.rowSpan = 1;
                                } else {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    //@ts-ignore
                                    rows[rowSpanHeader.topCellIndex].allCells[j]
                                        .rowSpan++;
                                    //@ts-ignore
                                    cell.isRowSpanned = true;
                                }
                            }
                        }
                        return null;
                    })}
                    {rows.map((row, i) => {
                        return (
                            <tr
                                className={
                                    i % 4 === 0 && i > 3 ? styles.tr : ''
                                }
                                {...row.getRowProps()}
                            >
                                {row.cells.map((cell) => {
                                    //@ts-ignore
                                    if (cell.isRowSpanned) return null;
                                    else
                                        return (
                                            <td
                                                style={borderStyle}
                                                //@ts-ignore
                                                rowSpan={cell.rowSpan}
                                                {...cell.getCellProps()}
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

            <Button onClick={handleAdd}>Add</Button>
        </div>
    );
};

export default RowSpanTable;
