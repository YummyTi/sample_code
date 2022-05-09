import cx from 'classnames';
import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
// import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {useSortBy, useTable} from 'react-table';

import UpIcon from '@src/images/svgs/UpIcon';
import DayPickerComponent from '@src/shared/components/DayPicker';
import MapY from '@src/shared/components/map';
import {mockData} from '@src/shared/constants/mockData';

import PermissionTable from '@features/permission/components/PermissionTable';

import CheckpointsPage from '../manage/checkpoints';
import RowSpanTable from './components/RowSpanTable';
import EditableCell from './EditableCell';
import s from './index.module.scss';

const defaultColumn = {
    Cell: EditableCell,
};

const NotFoundPage = () => {
    const {t} = useTranslation();
    const [data, setData] = React.useState(mockData);
    const [originalData] = React.useState(data);
    const [skipPageReset, setSkipPageReset] = React.useState(false);

    const columns: any = useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'id',
                width: 10,
                maxWidth: 30,
            },
            {
                Header: t('name'),
                accessor: 'fullname',
            },
            {
                Header: t('login'),
                accessor: 'login',
            },

            {
                Header: t('role'),
                accessor: 'region_id',
            },

            {
                Header: t('remark'),
                accessor: 'remark',
            },
        ],
        [t],
    );

    const updateMyData = (rowIndex: any, columnId: any, value: any) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true);
        setData((old: any) =>
            old.map((row: any, index: number) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            }),
        );
    };

    React.useEffect(() => {
        setSkipPageReset(false);
    }, [data]);

    const resetData = () => setData(originalData);

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable(
            {
                columns,
                data,
                defaultColumn,
                // @ts-ignore
                autoResetPage: !skipPageReset,
                // @ts-ignore
                updateMyData,
            },
            useSortBy,
        );

    const handleRow = useCallback((row: any) => {
        console.log(row, 'row');
    }, []);

    return (
        <div style={style}>
            {/* <DayPickerComponent /> */}
            <MapY />
            {/* <PermissionTable /> */}
            {/* <CheckpointsPage /> */}
            {/* <RowSpanTable /> */}
            {/* <EditForm /> */}
        </div>
    );
};

export default NotFoundPage;

const style: any = {
    height: '100vh',
    width: '100vw',
    overflowY: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '25px',
};

{
    /* <MapContainer
                style={{height: '400px', width: '400px'}}
                center={[51.505, -0.09]}
                zoom={13}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer> */
}

{
    /* <div>
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
                                    onClick={() => handleRow(row)}

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
            </div> */
}
