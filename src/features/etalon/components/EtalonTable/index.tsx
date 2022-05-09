import {IconButton} from '@mui/material';
import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSortBy, useTable} from 'react-table';

import DeleteLobby from '@src/images/svgs/DeleteLobby';
import {useEtalonStore} from '@src/shared/store/etalon';

import EditableCell from './EditableCell';
import styles from './index.module.scss';

const defaultColumn = {
    Cell: EditableCell,
};

const EtalonTable = () => {
    const {t} = useTranslation();
    const {data, setData} = useEtalonStore((state) => ({...state}));
    // const [data, setData] = React.useState(mockData);

    const updateMyData = (rowIndex: any, columnId: any, value: any) => {
        // We also turn on the flag to not reset the page
        setData(
            data.map((row: any, index: number) => {
                if (index === rowIndex) {
                    return {
                        ...data[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            }),
        );
    };

    const handleReset = (id: number) => {
        const newArr = [
            ...data.slice(0, id),
            {
                id,
                name: data[id].name,
                allTransport: 0,
                mor6: 0,
                mor8: 0,
                mor9: 0,
                aft14: 0,
                aft15: 0,
                aft17: 0,
                evn19: 0,
                evn21: 0,
                evn22: 0,
                evn23: 0,
                per0: 0,
                per10: 0,
                per15: 0,
                per20: 0,
                act: 'act',
            },
            ...data.slice(id + 1),
        ];

        setData(newArr);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: t('planRaces'),
                accessor: 'name',
                rowSpan: 2,
                enableRowSpan: true,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: 'name',
                        displayNone: true,
                        Cell: (props: any) => {
                            return props.value;
                        },
                    },
                ],
            },

            {
                Header: t('busCountSchedule'),
                columns: [
                    {
                        Header: t('allRaces'),
                        accessor: 'allTransport',
                    },
                    {
                        Header: '6:00',
                        accessor: 'mor6',
                    },
                    {
                        Header: '8:00',
                        accessor: 'mor8',
                    },
                    {
                        Header: '9:00',
                        accessor: 'mor9',
                    },
                    {
                        Header: '14:00',
                        accessor: 'aft14',
                    },
                    {
                        Header: '15:00',
                        accessor: 'aft15',
                    },
                    {
                        Header: '17:00',
                        accessor: 'aft17',
                    },
                    {
                        Header: '19:00',
                        accessor: 'evn19',
                    },
                    {
                        Header: '21:00',
                        accessor: 'evn21',
                    },
                    {
                        Header: '22:00',
                        accessor: 'evn22',
                    },
                    {
                        Header: '23:00',
                        accessor: 'evn23',
                    },
                    {
                        Header: t('norm_fuel'),
                        accessor: 'norm_fuel',
                    },
                ],
            },
            {
                Header: t('races'),
                columns: [
                    {
                        Header: '0%',
                        accessor: 'per0',
                    },
                    {
                        Header: '10%',
                        accessor: 'per10',
                        Cell: (props: any) => {
                            const actVal = +props.row.original.per0 - 10;
                            if (actVal <= 0) {
                                return 0;
                            } else {
                                return actVal;
                            }
                        },
                    },
                    {
                        Header: '15%',
                        accessor: 'per15',
                        Cell: (props: any) => {
                            const actVal = +props.row.original.per0 - 15;

                            if (actVal <= 0) {
                                return 0;
                            } else {
                                return actVal;
                            }
                        },
                    },
                    {
                        Header: '20%',
                        accessor: 'per20',
                        Cell: (props: any) => {
                            const actVal = +props.row.original.per0 - 20;

                            if (actVal <= 0) {
                                return 0;
                            } else {
                                return actVal;
                            }
                        },
                    },
                    {
                        Header: t('operations'),
                        accessor: 'act',
                        Cell: (props: any) => {
                            return (
                                <IconButton
                                    onClick={() => {
                                        handleReset(props.row.original.id);
                                    }}
                                >
                                    <DeleteLobby />
                                </IconButton>
                            );
                        },
                    },
                ],
            },
        ],
        [t, data],
    );

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data,
            defaultColumn,
            // @ts-ignore
            updateMyData,
        });

    return (
        <div className={styles.container}>
            <table className={styles.table} {...getTableProps()}>
                <thead className={styles.theader}>
                    {headerGroups.map((headerGroup: any) => (
                        <tr
                            className={styles.thRow}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map(
                                (column: any, index: number) => {
                                    return (
                                        <th
                                            {...column
                                                .getHeaderProps
                                                // column.getSortByToggleProps(),
                                                ()}
                                            rowSpan={`${column.rowSpan ?? 1}`}
                                            style={
                                                column.displayNone
                                                    ? {display: 'none'}
                                                    : null
                                            }
                                            active={!!column.isSorted}
                                            className={cx(styles.th, [
                                                column?.id === 'allTransport' &&
                                                    styles.thFirst,
                                            ])}
                                        >
                                            {column.render('Header')}

                                            {/* <UpIcon
                                                className={cx(
                                                    column.isSortedDesc && 'tUp',
                                                    column.isSorted && 'tActive',
                                                    'tUpIcon',
                                                )}
                                            /> */}
                                        </th>
                                    );
                                },
                            )}
                        </tr>
                    ))}
                </thead>

                <tbody className={styles.tbody} {...getTableBodyProps()}>
                    {rows.map((row: any, i) => {
                        prepareRow(row);
                        return (
                            <tr
                                className={styles.bodyRow}
                                {...row.getRowProps()}
                                onClick={() => {
                                    // console.log(row);
                                }}

                                //   cursorRow={cursorRow}
                            >
                                {row.cells.map((cell: any) => {
                                    return (
                                        <td
                                            className={styles.td}
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
        </div>
    );
};

export default EtalonTable;
