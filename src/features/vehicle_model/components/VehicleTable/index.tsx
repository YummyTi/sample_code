import cx from 'classnames';
import {keys} from 'ramda';
import React, {useMemo} from 'react';
import {useSortBy, useTable} from 'react-table';

import UpIcon from '@src/images/svgs/UpIcon';
import {IVehicle} from '@src/shared/models/vehicle_model';

import styles from './index.module.scss';
import {mockData} from './mockData';

const VehicleTable = () => {
    const columns: any = useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'id',
            },
            {
                Header: 'Имя',
                accessor: 'name',
            },
            {
                Header: 'Работа',
                accessor: 'occupation',
            },
        ],
        [],
    );

    const handleFunction = () => {
        keys(mockData).map((item: string) => {
            console.log(item, mockData[item], 'item');
        });
    };

    handleFunction();

    const data = useMemo(() => {
        return keys(mockData).map((item: string) => {
            return mockData[item].map((newItem: IVehicle) => {
                console.log(newItem, 'new item');
                return newItem;
            });
        });
    }, [mockData]);

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({columns, data}, useSortBy);

    return (
        <div className="table__container">
            <div>
                <table className="table" {...getTableProps()}>
                    <thead className="thead">
                        {headerGroups.map((headerGroup: any) => (
                            <tr
                                className={cx('tr', 'tHeadRow')}
                                {...headerGroup.getHeaderGroupProps()}
                            >
                                {headerGroup.headers.map((column: any) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps(),
                                        )}
                                        active={!!column.isSorted}
                                        className="tHeaderStyle"
                                    >
                                        {column.render('Header')}

                                        <UpIcon
                                            className={cx(
                                                column.isSortedDesc && 'tUp',
                                                column.isSorted && 'tActive',
                                                'tUpIcon',
                                            )}
                                        />
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="tbody" {...getTableBodyProps()}>
                        {rows.map((row: any, i) => {
                            prepareRow(row);
                            return (
                                <tr
                                    className={cx(
                                        i % 2 === 0
                                            ? ['tr', 'tDouble']
                                            : ['tr', 'tNotDouble'],
                                    )}
                                    {...row.getRowProps()}
                                    //   onClick={() => {
                                    //     onClickRow(row.original);
                                    //   }}

                                    //   cursorRow={cursorRow}
                                >
                                    {row.cells.map((cell: any) => {
                                        return (
                                            <td
                                                className="td"
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
        </div>
    );
};

export default React.memo(VehicleTable);
