import {Checkbox} from '@mui/material';
import cx from 'classnames';
import React, {FC, useMemo} from 'react';
import {Row, useBlockLayout, useSortBy, useTable} from 'react-table';
import {FixedSizeList} from 'react-window';

import UpIcon from '@src/images/svgs/UpIcon';
import {useMainStore} from '@src/shared/store/main';

interface TableTemplateProps {
    comingData: any[];
    columns: any[];
    selected: any[];
    setSelected: (selected: any[]) => void;
    customStyles?: any;
}

const TableTemplate: FC<TableTemplateProps> = ({
    comingData,
    columns,
    selected,
    setSelected,
    customStyles,
}) => {
    const setOpenSide = useMainStore((state) => state.setOpenSide);

    const data = useMemo(
        () =>
            comingData?.map((elem, i) => ({
                col1: i + 1,
                ...elem,
            })),
        [comingData],
    );

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({columns, data}, useSortBy, useBlockLayout);

    const handleSidebar = (row: Row<any>) => {
        const isAdded = selected?.some(
            (elem) => elem.col1 === row.original.col1,
        );

        if (!isAdded) {
            setSelected([...selected, row.original]);
        } else {
            const filteredItem = selected?.filter(
                (item) => item.col1 !== row.original.col1,
            );
            setSelected(filteredItem);
        }
        setOpenSide(true);
    };

    const RenderRow = React.useCallback(
        ({index, style}) => {
            const row = rows[index];

            prepareRow(row);
            return (
                <div
                    className={cx(
                        index % 2 === 0
                            ? ['tr', 'tDouble']
                            : ['tr', 'tNotDouble'],
                    )}
                    {...row.getRowProps({style})}
                    onClick={() => {
                        handleSidebar(row);
                    }}
                >
                    <div className={cx('td', 'td_check', customStyles?.td)}>
                        <div className="checkbox__wrapper">
                            <Checkbox
                                checked={
                                    selected?.some(
                                        (item) =>
                                            item?.col1 === row?.original?.col1,
                                    ) || selected?.length === data?.length
                                }
                            />
                        </div>
                    </div>
                    {row.cells.map((cell) => {
                        return (
                            <div
                                className={cx('td', [
                                    cell.column.Header !== 'Id' && 'tPlus',
                                ])}
                                {...cell.getCellProps()}
                            >
                                {cell.render('Cell')}
                            </div>
                        );
                    })}
                </div>
            );
        },
        [prepareRow, rows, selected],
    );

    return (
        <div className="table__container">
            <div>
                <div className="table" {...getTableProps()}>
                    <div>
                        <div className="thead">
                            {headerGroups.map((headerGroup) => (
                                <div
                                    className={cx('tr', 'tHeadRow')}
                                    {...headerGroup.getHeaderGroupProps()}
                                >
                                    <div>
                                        <div
                                            className={cx(
                                                'checkbox__wrapper',
                                                'table_check',
                                            )}
                                        >
                                            <Checkbox
                                                checked={
                                                    selected?.length ===
                                                    data?.length
                                                }
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelected(data);
                                                        setOpenSide(true);
                                                    } else {
                                                        setSelected([]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {headerGroup.headers.map((column: any) => {
                                        return (
                                            <div
                                                {...column.getHeaderProps(
                                                    column?.getSortByToggleProps(),
                                                )}
                                                active={!!column.isSorted}
                                                className={cx(
                                                    'tHeaderStyle',
                                                    customStyles?.th,
                                                    [
                                                        column.Header?.toLowerCase() !==
                                                            'id' && 'tPlus',
                                                    ],
                                                )}
                                            >
                                                {column.render('Header')}

                                                <UpIcon
                                                    className={cx(
                                                        column.isSortedDesc &&
                                                            'tUp',
                                                        column.isSorted &&
                                                            'tActive',
                                                        'tUpIcon',
                                                    )}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="tbody" {...getTableBodyProps()}>
                        <FixedSizeList
                            height={600}
                            itemCount={rows.length}
                            itemSize={100}
                            width="100%"
                        >
                            {RenderRow}
                        </FixedSizeList>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableTemplate;

// return (
//     <div
//       {...row.getRowProps({
//         style,
//       })}
//       className="tr"
//     >
//       {row.cells.map(cell => {
//         return (
//           <div {...cell.getCellProps()} className="td">
//             {cell.render('Cell')}
//           </div>
//         )
//       })}
//     </div>
//   )
