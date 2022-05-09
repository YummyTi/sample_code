import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useTable} from 'react-table';
import shallow from 'zustand/shallow';

import {localNotification} from '@shared/helpers';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {useEditRouteStore} from '@store/edit_route';
import {useKppStore} from '@store/kpp';
import {useScheduleStore} from '@store/schedule';

import styles from './index.module.scss';
import useScheduleData from './useScheduleData';

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
const {notifyWaring} = localNotification;

const ScheduleTable = () => {
    const {data, columns} = useScheduleData();
    const {t} = useTranslation();
    const setTab = useEditRouteStore((state) => state.setTab);
    const {kppById} = useKppStore((state) => state, shallow);
    const {newData, setUpdate, setOpenM, setUpdStep} = useScheduleStore(
        (state) => ({...state}),
        shallow,
    );
    const {canEdit} = useLocationPermission('routes');

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        //@ts-ignore
        rowSpanHeaders,
    } = useTable({columns, data}, (hooks) => {
        hooks.useInstance.push(useInstance);
    });

    const handleRow = (row: any) => {
        if (canEdit) {
            if (kppById?.length > 0) {
                const filteredRows = newData.filter(
                    (item) => item.schedule_id === row.original.schedule_id,
                );
                setUpdStep(filteredRows);
                setOpenM(true);
                setUpdate(true);
            } else {
                notifyWaring(t('noDataKpp'));
                setTab('1');
            }
        }
    };

    return (
        <div className={'vehicleRouteTableWrapper'}>
            <table className={'routeEditTable'} {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    {...column.getHeaderProps()}
                                    rowSpan={`${column.rowSpan ?? 1}`}
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
                                (x: any) => x.id === cell.column.id,
                            );

                            if (rowSpanHeader !== undefined) {
                                if (
                                    rowSpanHeader.topCellValue === null ||
                                    rowSpanHeader.topCellValue !== cell.value
                                ) {
                                    cell.isRowSpanned = false;
                                    rowSpanHeader.topCellValue = cell.value;
                                    rowSpanHeader.topCellIndex = i;

                                    cell.rowSpan = 1;
                                } else {
                                    const topCellRow = rows[
                                        rowSpanHeader.topCellIndex
                                    ] as any;
                                    topCellRow.allCells[j].rowSpan++;
                                    cell.isRowSpanned = true;
                                }
                            }
                        }
                        return null;
                    })}
                    {rows.map((row, i) => {
                        return (
                            <tr
                                onClick={() => handleRow(row)}
                                className={styles.tr}
                                {...row.getRowProps()}
                            >
                                {row.cells.map((cell: any) => {
                                    if (cell.isRowSpanned) return null;
                                    else
                                        return (
                                            <td
                                                className={cx(styles.tdMain, [
                                                    i % 4 === 0 && i > 3
                                                        ? styles.td
                                                        : '',
                                                ])}
                                                style={borderStyle}
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
        </div>
    );
};

export default ScheduleTable;
