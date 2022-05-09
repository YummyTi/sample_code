import cx from 'classnames';
import React from 'react';
import {useTable} from 'react-table';

import useLogData from '../../libs/useLogData';
import styles from './index.module.scss';

const LogsTable = () => {
    const {data, columns} = useLogData();

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data,
        });

    const handleRow = (row: any) => {
        console.log(row, 'row table');
    };

    return (
        <div className={'fulltable'}>
            <table
                className={cx('routeEditTable', styles.tableWrap)}
                {...getTableProps()}
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
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
                            <tr
                                onClick={() => handleRow(row)}
                                className={styles.tr}
                                {...row.getRowProps()}
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            className={cx(styles.tdMain)}
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

export default LogsTable;
