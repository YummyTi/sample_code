import cx from 'classnames';
import React, {useMemo} from 'react';
import {useTable} from 'react-table';
import shallow from 'zustand/shallow';

import {usePolygonStore} from '@store/polygon';

import PolygonPagination from '../PolygonPagination';
import styles from './index.module.scss';
import useData from './useData';

const PolygonTable = () => {
    const {polygons, totalCount} = usePolygonStore(
        (state) => ({...state}),
        shallow,
    );
    const {columns} = useData();
    const data = useMemo(
        () =>
            polygons.sort((a, b) => {
                if (a.completed === b.completed) {
                    return 1;
                } else {
                    return -1;
                }
            }),
        [polygons],
    );

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data,
        });

    const handleRow = (row: any) => {
        // console.log(row.row.original, 'row handle');
    };

    return (
        <div className={styles.container}>
            <div className={cx('vehicleRouteTableWrapper', styles.wrapper)}>
                <table
                    className={cx('routeEditTable', 'w-100')}
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
                                            <td {...cell.getCellProps()}>
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
            {totalCount > 10 && <PolygonPagination />}
        </div>
    );
};

export default PolygonTable;
