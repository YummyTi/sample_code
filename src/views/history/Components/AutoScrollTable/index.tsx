import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useTable} from 'react-table';

import s from './index.module.scss';

function Table({columns, data}: any) {
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data,
        });

    return (
        <table className={'historyTable'} {...getTableProps()}>
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
    );
}

export const AutoScrollTable = () => {
    const {t} = useTranslation();
    const columns = useMemo(() => {
        return [
            {
                Header: t('tracks'),
                columns: [
                    {
                        Header: t('time'),
                        accessor: 'time',
                    },
                    {
                        Header: t('latitude'),
                        accessor: 'latitude',
                    },
                    {
                        Header: t('longitude'),
                        accessor: 'longitude',
                    },
                    {
                        Header: t('speed'),
                        accessor: 'speed',
                    },
                ],
            },
        ];
    }, []);

    const data = [
        {
            time: '20:39:34',
            latitude: -32.947692,
            longitude: -60.6743215,
            speed: 25,
        },
        {
            time: '1:37:27',
            latitude: 29.1416432,
            longitude: 119.7889248,
            speed: 70,
        },
        {
            time: '1:54:28',
            latitude: 60.1163207,
            longitude: 32.3008149,
            speed: 17,
        },
        {
            time: '16:35:48',
            latitude: -7.0510263,
            longitude: 111.8330106,
            speed: 71,
        },
        {
            time: '0:27:23',
            latitude: 22.5738562,
            longitude: 113.89831,
            speed: 54,
        },
        {
            time: '18:18:50',
            latitude: -34.683901,
            longitude: -55.709609,
            speed: 77,
        },
        {
            time: '20:15:52',
            latitude: -6.8,
            longitude: 106.183333,
            speed: 57,
        },
        {
            time: '1:15:24',
            latitude: 26.89023,
            longitude: 100.233878,
            speed: 7,
        },
        {
            time: '9:43:56',
            latitude: 43.9373047,
            longitude: 15.4435586,
            speed: 91,
        },
        {
            time: '22:07:27',
            latitude: 59.0842105,
            longitude: 159.9541642,
            speed: 79,
        },
        {
            time: '0:22:49',
            latitude: 34.9255083,
            longitude: 64.1478236,
            speed: 30,
        },
        {
            time: '5:36:09',
            latitude: 51.811764,
            longitude: 18.7885677,
            speed: 65,
        },
        {
            time: '12:09:07',
            latitude: 16.1218015,
            longitude: 120.3969759,
            speed: 28,
        },
        {
            time: '16:41:47',
            latitude: -7.382645,
            longitude: 107.7458559,
            speed: 7,
        },
        {
            time: '17:45:06',
            latitude: 23.883531,
            longitude: 110.666614,
            speed: 23,
        },
        {
            time: '6:49:32',
            latitude: -6.8897321,
            longitude: 110.7480064,
            speed: 81,
        },
        {
            time: '10:45:38',
            latitude: 58.9482486,
            longitude: 23.5370533,
            speed: 31,
        },
        {
            time: '1:59:21',
            latitude: -7.4813316,
            longitude: 108.4187029,
            speed: 73,
        },
        {
            time: '18:59:20',
            latitude: -6.9580488,
            longitude: 107.5847246,
            speed: 12,
        },
        {
            time: '19:40:14',
            latitude: -13.6635336,
            longitude: 48.4537424,
            speed: 74,
        },
        {
            time: '23:04:59',
            latitude: 42.4678076,
            longitude: -70.9844,
            speed: 91,
        },
        {
            time: '3:05:59',
            latitude: 11.66503,
            longitude: -1.0634024,
            speed: 20,
        },
        {
            time: '7:11:53',
            latitude: 56.1114024,
            longitude: 94.571633,
            speed: 72,
        },
        {
            time: '2:40:24',
            latitude: 27.66787,
            longitude: 106.883864,
            speed: 91,
        },
        {
            time: '18:39:32',
            latitude: -6.8268504,
            longitude: 111.8359916,
            speed: 39,
        },
        {
            time: '0:22:32',
            latitude: 11.446769,
            longitude: 125.491172,
            speed: 52,
        },
        {
            time: '19:50:34',
            latitude: 19.4392516,
            longitude: -99.1636051,
            speed: 4,
        },
        {
            time: '8:40:02',
            latitude: -33.6060255,
            longitude: -70.8781837,
            speed: 38,
        },
        {
            time: '17:15:25',
            latitude: 55.6686,
            longitude: 37.5470072,
            speed: 83,
        },
        {
            time: '3:15:29',
            latitude: -20.210385,
            longitude: 57.6240731,
            speed: 91,
        },
        {
            time: '8:54:45',
            latitude: 43.915,
            longitude: 67.24806,
            speed: 37,
        },
        {
            time: '10:21:40',
            latitude: 41.5838798,
            longitude: -8.5932108,
            speed: 18,
        },
        {
            time: '0:37:59',
            latitude: 33.5147935,
            longitude: 130.4936331,
            speed: 2,
        },
        {
            time: '10:27:58',
            latitude: 52.1327312,
            longitude: 18.2293232,
            speed: 74,
        },
        {
            time: '5:14:52',
            latitude: 34.683646,
            longitude: 112.469023,
            speed: 2,
        },
        {
            time: '16:44:40',
            latitude: 44.4412922,
            longitude: 42.8839636,
            speed: 40,
        },
        {
            time: '4:02:20',
            latitude: 23.156045,
            longitude: 112.896606,
            speed: 51,
        },
        {
            time: '19:45:19',
            latitude: 17.5971816,
            longitude: 120.6096456,
            speed: 14,
        },
        {
            time: '23:41:35',
            latitude: -7.2360801,
            longitude: 106.7175669,
            speed: 7,
        },
        {
            time: '10:32:20',
            latitude: 6.8928179,
            longitude: 125.1635402,
            speed: 41,
        },
        {
            time: '1:53:57',
            latitude: -6.6389142,
            longitude: 111.4737946,
            speed: 26,
        },
        {
            time: '19:04:24',
            latitude: 47.6632745,
            longitude: 1.206057,
            speed: 40,
        },
        {
            time: '6:08:03',
            latitude: 14.5179897,
            longitude: -17.0096553,
            speed: 75,
        },
        {
            time: '8:38:35',
            latitude: -6.9136675,
            longitude: 107.6200524,
            speed: 49,
        },
        {
            time: '21:39:50',
            latitude: 37.366903,
            longitude: 114.926383,
            speed: 41,
        },
        {
            time: '13:13:50',
            latitude: -5.0938488,
            longitude: -81.0962172,
            speed: 21,
        },
        {
            time: '21:10:33',
            latitude: 29.482105,
            longitude: 86.228141,
            speed: 28,
        },
        {
            time: '22:34:17',
            latitude: 56.5303315,
            longitude: 37.5975489,
            speed: 5,
        },
        {
            time: '16:30:11',
            latitude: 13.0710293,
            longitude: 123.4584998,
            speed: 85,
        },
        {
            time: '6:09:41',
            latitude: -37.9707308,
            longitude: -57.6258993,
            speed: 11,
        },
        {
            time: '23:40:48',
            latitude: -7.7169637,
            longitude: 107.9472579,
            speed: 93,
        },
        {
            time: '11:48:23',
            latitude: 5.768717,
            longitude: -72.831906,
            speed: 69,
        },
        {
            time: '12:34:53',
            latitude: 54.1407588,
            longitude: 43.1704696,
            speed: 84,
        },
        {
            time: '5:47:23',
            latitude: 37.9331181,
            longitude: 102.6293927,
            speed: 12,
        },
        {
            time: '21:50:38',
            latitude: 59.8646264,
            longitude: 17.6912342,
            speed: 34,
        },
        {
            time: '8:20:12',
            latitude: 65.8368628,
            longitude: 24.0986491,
            speed: 98,
        },
        {
            time: '13:44:21',
            latitude: -27.92295,
            longitude: 24.83446,
            speed: 16,
        },
        {
            time: '3:49:44',
            latitude: 31.18248,
            longitude: 35.69999,
            speed: 14,
        },
        {
            time: '17:50:54',
            latitude: -9.582,
            longitude: 119.367,
            speed: 76,
        },
        {
            time: '9:37:37',
            latitude: -37.0716565,
            longitude: 174.9770262,
            speed: 30,
        },
        {
            time: '2:45:50',
            latitude: -32.93645,
            longitude: -68.8733205,
            speed: 2,
        },
        {
            time: '12:37:39',
            latitude: 55.859897,
            longitude: 13.6699417,
            speed: 84,
        },
        {
            time: '0:53:54',
            latitude: 6.0102236,
            longitude: -72.4494848,
            speed: 5,
        },
        {
            time: '20:03:17',
            latitude: -34.5941789,
            longitude: -58.7294973,
            speed: 24,
        },
        {
            time: '4:53:51',
            latitude: 44.4528239,
            longitude: 19.0902035,
            speed: 43,
        },
        {
            time: '9:41:44',
            latitude: 50.1062428,
            longitude: 22.7546149,
            speed: 29,
        },
        {
            time: '22:01:57',
            latitude: 30.21,
            longitude: -97.8,
            speed: 82,
        },
        {
            time: '7:08:07',
            latitude: 34.262709,
            longitude: 108.355232,
            speed: 48,
        },
        {
            time: '14:56:13',
            latitude: 32.2514545,
            longitude: -110.8374104,
            speed: 53,
        },
        {
            time: '17:50:08',
            latitude: 33.24001,
            longitude: 68.8663,
            speed: 22,
        },
        {
            time: '3:47:39',
            latitude: 14.6423905,
            longitude: 120.9575622,
            speed: 9,
        },
        {
            time: '9:26:18',
            latitude: 13.7464901,
            longitude: 100.5129096,
            speed: 37,
        },
        {
            time: '1:47:41',
            latitude: 53.8072015,
            longitude: 87.372095,
            speed: 91,
        },
        {
            time: '16:49:21',
            latitude: 60.1734181,
            longitude: 18.1771765,
            speed: 55,
        },
        {
            time: '20:32:19',
            latitude: -39.8173788,
            longitude: -73.2425333,
            speed: 54,
        },
        {
            time: '16:30:13',
            latitude: -7.106273,
            longitude: 31.234619,
            speed: 35,
        },
        {
            time: '16:51:06',
            latitude: -6.6047761,
            longitude: 108.024301,
            speed: 92,
        },
        {
            time: '13:55:03',
            latitude: 59.2695504,
            longitude: 18.0574637,
            speed: 76,
        },
        {
            time: '22:55:36',
            latitude: 29.3781872,
            longitude: 121.9194335,
            speed: 25,
        },
        {
            time: '20:32:29',
            latitude: 11.7744786,
            longitude: 124.8827037,
            speed: 42,
        },
        {
            time: '12:47:45',
            latitude: 53.1387595,
            longitude: -7.0625888,
            speed: 25,
        },
        {
            time: '11:56:08',
            latitude: -8.6051214,
            longitude: 115.1600621,
            speed: 16,
        },
        {
            time: '14:39:53',
            latitude: 39.042852,
            longitude: 117.318781,
            speed: 48,
        },
        {
            time: '11:08:22',
            latitude: 38.2887838,
            longitude: -8.0376603,
            speed: 99,
        },
        {
            time: '7:55:27',
            latitude: 25.783198,
            longitude: 109.607675,
            speed: 46,
        },
        {
            time: '5:35:15',
            latitude: 22.826877,
            longitude: 107.840624,
            speed: 80,
        },
        {
            time: '8:43:47',
            latitude: 35.8036079,
            longitude: 126.8808872,
            speed: 72,
        },
        {
            time: '8:10:32',
            latitude: -8.0888877,
            longitude: 111.4514369,
            speed: 70,
        },
        {
            time: '21:06:18',
            latitude: 14.593975,
            longitude: 121.0038631,
            speed: 71,
        },
        {
            time: '4:22:32',
            latitude: 50.0099822,
            longitude: 17.0336959,
            speed: 57,
        },
        {
            time: '12:57:28',
            latitude: 38.9458437,
            longitude: -8.9978149,
            speed: 15,
        },
        {
            time: '6:06:28',
            latitude: 56.9938866,
            longitude: 86.182232,
            speed: 70,
        },
        {
            time: '5:34:45',
            latitude: 15.0045218,
            longitude: -2.9550619,
            speed: 2,
        },
        {
            time: '2:25:53',
            latitude: 10.9322366,
            longitude: 121.9864492,
            speed: 73,
        },
        {
            time: '23:56:59',
            latitude: -9.771006,
            longitude: -76.6613239,
            speed: 88,
        },
        {
            time: '5:50:03',
            latitude: 45.1141124,
            longitude: 41.0051614,
            speed: 27,
        },
        {
            time: '15:42:08',
            latitude: 17.775429,
            longitude: 120.683745,
            speed: 61,
        },
        {
            time: '12:11:10',
            latitude: 22.948016,
            longitude: 113.366904,
            speed: 72,
        },
        {
            time: '6:23:12',
            latitude: 39.7317899,
            longitude: -8.9338952,
            speed: 52,
        },
        {
            time: '6:54:34',
            latitude: 59.902198,
            longitude: 30.337848,
            speed: 54,
        },
    ];
    return (
        <div className={'historyTableWrapper ' + s.autoScrollTableWrapper}>
            <Table columns={columns} data={data} />
        </div>
    );
};
