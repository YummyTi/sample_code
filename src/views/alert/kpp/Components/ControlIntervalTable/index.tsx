import cx from 'classnames';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {KppTable} from './Components/KppTable';
import s from './index.module.scss';

export const KppTablesComponent = () => {
    const {t} = useTranslation();
    const data = [
        {
            raceNum: 8,
            graphic: 29,
            garage: 72,
            tabel_number: 88,
            drove: '7/2/2021',
            start_time: '1/19/2022',
            interval: '5/24/2021',
            idle: '1/6/2022',
            fact: '3/4/2022',
            plan: '7/30/2021',
            diff: '8/19/2021',
        },
        {
            raceNum: 9,
            graphic: 86,
            garage: 10,
            tabel_number: 89,
            drove: '7/3/2021',
            start_time: '2/3/2022',
            interval: '5/9/2021',
            idle: '1/17/2022',
            fact: '9/27/2021',
            plan: '1/30/2022',
            diff: '6/29/2021',
        },
        {
            raceNum: 76,
            graphic: 20,
            garage: 3,
            tabel_number: 69,
            drove: '9/28/2021',
            start_time: '2/25/2022',
            interval: '6/21/2021',
            idle: '5/31/2021',
            fact: '7/21/2021',
            plan: '9/5/2021',
            diff: '4/11/2022',
        },
        {
            raceNum: 28,
            graphic: 60,
            garage: 2,
            tabel_number: 95,
            drove: '9/4/2021',
            start_time: '4/5/2022',
            interval: '2/21/2022',
            idle: '6/3/2021',
            fact: '4/14/2022',
            plan: '2/11/2022',
            diff: '7/6/2021',
        },
        {
            raceNum: 8,
            graphic: 51,
            garage: 44,
            tabel_number: 99,
            drove: '4/11/2022',
            start_time: '7/14/2021',
            interval: '1/1/2022',
            idle: '11/29/2021',
            fact: '4/19/2022',
            plan: '8/30/2021',
            diff: '7/12/2021',
        },
        {
            raceNum: 27,
            graphic: 34,
            garage: 68,
            tabel_number: 47,
            drove: '8/31/2021',
            start_time: '7/24/2021',
            interval: '5/31/2021',
            idle: '10/1/2021',
            fact: '6/26/2021',
            plan: '8/14/2021',
            diff: '10/30/2021',
        },
        {
            raceNum: 32,
            graphic: 57,
            garage: 34,
            tabel_number: 91,
            drove: '2/23/2022',
            start_time: '9/6/2021',
            interval: '10/10/2021',
            idle: '1/1/2022',
            fact: '2/27/2022',
            plan: '5/26/2021',
            diff: '6/4/2021',
        },
        {
            raceNum: 11,
            graphic: 64,
            garage: 8,
            tabel_number: 45,
            drove: '5/13/2021',
            start_time: '9/6/2021',
            interval: '2/22/2022',
            idle: '7/28/2021',
            fact: '5/2/2021',
            plan: '6/9/2021',
            diff: '11/19/2021',
        },
        {
            raceNum: 50,
            graphic: 40,
            garage: 66,
            tabel_number: 66,
            drove: '3/18/2022',
            start_time: '3/30/2022',
            interval: '7/17/2021',
            idle: '12/26/2021',
            fact: '5/19/2021',
            plan: '5/15/2021',
            diff: '5/5/2021',
        },
        {
            raceNum: 44,
            graphic: 47,
            garage: 24,
            tabel_number: 28,
            drove: '3/3/2022',
            start_time: '3/27/2022',
            interval: '9/30/2021',
            idle: '4/20/2022',
            fact: '12/2/2021',
            plan: '1/9/2022',
            diff: '11/20/2021',
        },
        {
            raceNum: 81,
            graphic: 2,
            garage: 27,
            tabel_number: 16,
            drove: '4/24/2022',
            start_time: '3/9/2022',
            interval: '8/23/2021',
            idle: '3/21/2022',
            fact: '11/3/2021',
            plan: '10/22/2021',
            diff: '11/5/2021',
        },
        {
            raceNum: 76,
            graphic: 100,
            garage: 24,
            tabel_number: 51,
            drove: '5/20/2021',
            start_time: '12/29/2021',
            interval: '3/20/2022',
            idle: '4/3/2022',
            fact: '9/21/2021',
            plan: '7/16/2021',
            diff: '7/7/2021',
        },
        {
            raceNum: 6,
            graphic: 12,
            garage: 49,
            tabel_number: 44,
            drove: '11/28/2021',
            start_time: '4/16/2022',
            interval: '4/3/2022',
            idle: '9/1/2021',
            fact: '10/3/2021',
            plan: '5/8/2021',
            diff: '7/15/2021',
        },
        {
            raceNum: 12,
            graphic: 67,
            garage: 41,
            tabel_number: 76,
            drove: '4/13/2022',
            start_time: '4/18/2022',
            interval: '8/9/2021',
            idle: '7/4/2021',
            fact: '2/12/2022',
            plan: '7/21/2021',
            diff: '6/20/2021',
        },
        {
            raceNum: 35,
            graphic: 96,
            garage: 70,
            tabel_number: 49,
            drove: '2/2/2022',
            start_time: '9/29/2021',
            interval: '5/4/2021',
            idle: '7/13/2021',
            fact: '3/26/2022',
            plan: '4/27/2022',
            diff: '3/26/2022',
        },
        {
            raceNum: 45,
            graphic: 58,
            garage: 56,
            tabel_number: 92,
            drove: '5/23/2021',
            start_time: '5/19/2021',
            interval: '1/20/2022',
            idle: '3/8/2022',
            fact: '8/2/2021',
            plan: '5/4/2021',
            diff: '8/4/2021',
        },
        {
            raceNum: 20,
            graphic: 26,
            garage: 74,
            tabel_number: 82,
            drove: '11/1/2021',
            start_time: '8/31/2021',
            interval: '8/17/2021',
            idle: '2/8/2022',
            fact: '1/6/2022',
            plan: '6/16/2021',
            diff: '4/12/2022',
        },
        {
            raceNum: 10,
            graphic: 47,
            garage: 100,
            tabel_number: 78,
            drove: '4/4/2022',
            start_time: '7/1/2021',
            interval: '10/1/2021',
            idle: '8/24/2021',
            fact: '3/28/2022',
            plan: '10/16/2021',
            diff: '12/15/2021',
        },
        {
            raceNum: 8,
            graphic: 81,
            garage: 60,
            tabel_number: 96,
            drove: '4/4/2022',
            start_time: '9/18/2021',
            interval: '6/12/2021',
            idle: '7/23/2021',
            fact: '12/20/2021',
            plan: '5/27/2021',
            diff: '11/27/2021',
        },
        {
            raceNum: 86,
            graphic: 99,
            garage: 78,
            tabel_number: 88,
            drove: '2/1/2022',
            start_time: '1/30/2022',
            interval: '1/18/2022',
            idle: '12/13/2021',
            fact: '5/14/2021',
            plan: '6/11/2021',
            diff: '9/3/2021',
        },
        {
            raceNum: 37,
            graphic: 23,
            garage: 8,
            tabel_number: 7,
            drove: '6/1/2021',
            start_time: '6/8/2021',
            interval: '11/11/2021',
            idle: '2/20/2022',
            fact: '12/1/2021',
            plan: '6/3/2021',
            diff: '2/13/2022',
        },
        {
            raceNum: 100,
            graphic: 52,
            garage: 11,
            tabel_number: 51,
            drove: '5/30/2021',
            start_time: '5/10/2021',
            interval: '10/6/2021',
            idle: '7/1/2021',
            fact: '3/30/2022',
            plan: '12/8/2021',
            diff: '11/12/2021',
        },
        {
            raceNum: 67,
            graphic: 30,
            garage: 45,
            tabel_number: 42,
            drove: '4/5/2022',
            start_time: '5/18/2021',
            interval: '12/12/2021',
            idle: '9/23/2021',
            fact: '1/5/2022',
            plan: '5/19/2021',
            diff: '8/24/2021',
        },
        {
            raceNum: 23,
            graphic: 39,
            garage: 83,
            tabel_number: 14,
            drove: '12/13/2021',
            start_time: '12/12/2021',
            interval: '4/22/2022',
            idle: '1/22/2022',
            fact: '7/14/2021',
            plan: '6/22/2021',
            diff: '6/18/2021',
        },
        {
            raceNum: 23,
            graphic: 21,
            garage: 37,
            tabel_number: 85,
            drove: '3/8/2022',
            start_time: '11/21/2021',
            interval: '8/6/2021',
            idle: '9/8/2021',
            fact: '5/21/2021',
            plan: '10/11/2021',
            diff: '12/14/2021',
        },
        {
            raceNum: 34,
            graphic: 30,
            garage: 96,
            tabel_number: 4,
            drove: '5/2/2021',
            start_time: '5/10/2021',
            interval: '7/8/2021',
            idle: '10/10/2021',
            fact: '5/10/2021',
            plan: '4/8/2022',
            diff: '11/29/2021',
        },
        {
            raceNum: 12,
            graphic: 37,
            garage: 93,
            tabel_number: 100,
            drove: '2/27/2022',
            start_time: '6/12/2021',
            interval: '10/24/2021',
            idle: '4/14/2022',
            fact: '2/21/2022',
            plan: '4/17/2022',
            diff: '2/2/2022',
        },
        {
            raceNum: 77,
            graphic: 30,
            garage: 86,
            tabel_number: 62,
            drove: '12/27/2021',
            start_time: '8/12/2021',
            interval: '7/9/2021',
            idle: '5/16/2021',
            fact: '5/20/2021',
            plan: '7/6/2021',
            diff: '11/26/2021',
        },
        {
            raceNum: 85,
            graphic: 96,
            garage: 33,
            tabel_number: 6,
            drove: '5/14/2021',
            start_time: '8/23/2021',
            interval: '8/7/2021',
            idle: '7/12/2021',
            fact: '5/26/2021',
            plan: '4/17/2022',
            diff: '1/29/2022',
        },
        {
            raceNum: 32,
            graphic: 20,
            garage: 84,
            tabel_number: 73,
            drove: '11/17/2021',
            start_time: '1/3/2022',
            interval: '6/29/2021',
            idle: '1/7/2022',
            fact: '8/3/2021',
            plan: '6/14/2021',
            diff: '2/16/2022',
        },
        {
            raceNum: 88,
            graphic: 30,
            garage: 54,
            tabel_number: 98,
            drove: '5/19/2021',
            start_time: '4/28/2022',
            interval: '2/12/2022',
            idle: '6/21/2021',
            fact: '11/28/2021',
            plan: '2/23/2022',
            diff: '1/13/2022',
        },
        {
            raceNum: 73,
            graphic: 71,
            garage: 16,
            tabel_number: 42,
            drove: '3/24/2022',
            start_time: '11/7/2021',
            interval: '2/3/2022',
            idle: '2/3/2022',
            fact: '12/4/2021',
            plan: '12/12/2021',
            diff: '1/12/2022',
        },
        {
            raceNum: 69,
            graphic: 53,
            garage: 61,
            tabel_number: 49,
            drove: '4/20/2022',
            start_time: '10/3/2021',
            interval: '10/28/2021',
            idle: '3/11/2022',
            fact: '2/22/2022',
            plan: '10/7/2021',
            diff: '10/2/2021',
        },
        {
            raceNum: 74,
            graphic: 8,
            garage: 73,
            tabel_number: 35,
            drove: '12/9/2021',
            start_time: '5/31/2021',
            interval: '8/23/2021',
            idle: '11/23/2021',
            fact: '8/6/2021',
            plan: '12/15/2021',
            diff: '11/18/2021',
        },
        {
            raceNum: 94,
            graphic: 4,
            garage: 74,
            tabel_number: 5,
            drove: '8/2/2021',
            start_time: '6/23/2021',
            interval: '10/3/2021',
            idle: '3/17/2022',
            fact: '11/22/2021',
            plan: '2/4/2022',
            diff: '1/1/2022',
        },
        {
            raceNum: 51,
            graphic: 94,
            garage: 66,
            tabel_number: 45,
            drove: '2/4/2022',
            start_time: '2/16/2022',
            interval: '9/30/2021',
            idle: '7/13/2021',
            fact: '5/11/2021',
            plan: '5/22/2021',
            diff: '7/10/2021',
        },
        {
            raceNum: 38,
            graphic: 65,
            garage: 35,
            tabel_number: 21,
            drove: '4/14/2022',
            start_time: '9/1/2021',
            interval: '6/24/2021',
            idle: '4/21/2022',
            fact: '1/16/2022',
            plan: '9/8/2021',
            diff: '12/12/2021',
        },
        {
            raceNum: 43,
            graphic: 97,
            garage: 99,
            tabel_number: 9,
            drove: '8/11/2021',
            start_time: '4/26/2022',
            interval: '4/27/2022',
            idle: '7/31/2021',
            fact: '1/12/2022',
            plan: '10/9/2021',
            diff: '11/6/2021',
        },
        {
            raceNum: 82,
            graphic: 71,
            garage: 91,
            tabel_number: 62,
            drove: '8/24/2021',
            start_time: '9/19/2021',
            interval: '9/10/2021',
            idle: '1/15/2022',
            fact: '1/30/2022',
            plan: '10/30/2021',
            diff: '8/27/2021',
        },
        {
            raceNum: 4,
            graphic: 85,
            garage: 52,
            tabel_number: 68,
            drove: '8/23/2021',
            start_time: '8/23/2021',
            interval: '9/23/2021',
            idle: '2/28/2022',
            fact: '12/20/2021',
            plan: '3/3/2022',
            diff: '2/26/2022',
        },
        {
            raceNum: 97,
            graphic: 12,
            garage: 60,
            tabel_number: 5,
            drove: '4/28/2022',
            start_time: '8/15/2021',
            interval: '10/13/2021',
            idle: '3/2/2022',
            fact: '8/31/2021',
            plan: '10/13/2021',
            diff: '6/6/2021',
        },
        {
            raceNum: 21,
            graphic: 14,
            garage: 73,
            tabel_number: 70,
            drove: '12/23/2021',
            start_time: '2/6/2022',
            interval: '6/29/2021',
            idle: '5/20/2021',
            fact: '1/28/2022',
            plan: '3/19/2022',
            diff: '12/25/2021',
        },
        {
            raceNum: 72,
            graphic: 25,
            garage: 94,
            tabel_number: 34,
            drove: '9/12/2021',
            start_time: '11/18/2021',
            interval: '5/10/2021',
            idle: '9/25/2021',
            fact: '2/21/2022',
            plan: '6/4/2021',
            diff: '5/17/2021',
        },
        {
            raceNum: 54,
            graphic: 91,
            garage: 86,
            tabel_number: 59,
            drove: '7/13/2021',
            start_time: '2/6/2022',
            interval: '5/17/2021',
            idle: '11/30/2021',
            fact: '2/11/2022',
            plan: '7/19/2021',
            diff: '8/1/2021',
        },
        {
            raceNum: 87,
            graphic: 80,
            garage: 74,
            tabel_number: 14,
            drove: '6/25/2021',
            start_time: '6/30/2021',
            interval: '9/25/2021',
            idle: '8/24/2021',
            fact: '9/2/2021',
            plan: '6/5/2021',
            diff: '1/9/2022',
        },
        {
            raceNum: 14,
            graphic: 48,
            garage: 52,
            tabel_number: 35,
            drove: '1/11/2022',
            start_time: '9/4/2021',
            interval: '9/2/2021',
            idle: '2/10/2022',
            fact: '11/14/2021',
            plan: '4/7/2022',
            diff: '10/31/2021',
        },
        {
            raceNum: 74,
            graphic: 31,
            garage: 64,
            tabel_number: 37,
            drove: '12/23/2021',
            start_time: '3/2/2022',
            interval: '10/23/2021',
            idle: '11/22/2021',
            fact: '1/29/2022',
            plan: '6/6/2021',
            diff: '6/30/2021',
        },
        {
            raceNum: 69,
            graphic: 44,
            garage: 84,
            tabel_number: 99,
            drove: '12/30/2021',
            start_time: '9/13/2021',
            interval: '3/5/2022',
            idle: '8/16/2021',
            fact: '6/4/2021',
            plan: '7/28/2021',
            diff: '1/25/2022',
        },
        {
            raceNum: 72,
            graphic: 12,
            garage: 47,
            tabel_number: 14,
            drove: '3/30/2022',
            start_time: '9/18/2021',
            interval: '5/12/2021',
            idle: '3/9/2022',
            fact: '6/2/2021',
            plan: '2/7/2022',
            diff: '2/2/2022',
        },
        {
            raceNum: 17,
            graphic: 50,
            garage: 12,
            tabel_number: 3,
            drove: '10/12/2021',
            start_time: '11/13/2021',
            interval: '1/24/2022',
            idle: '2/17/2022',
            fact: '8/11/2021',
            plan: '9/1/2021',
            diff: '3/8/2022',
        },
    ];
    const tableColumn1 = useMemo(() => {
        return [
            {
                Header: 'Чилонзор мавзеси 25-даҳа АШБ',
                columns: [
                    {
                        Header: t('race') + ' №',
                        accessor: 'raceNum',
                    },
                    {
                        Header: t('graphic'),
                        accessor: 'graphic',
                    },
                    {
                        Header: t('garage') + ' №',
                        accessor: 'garage',
                    },
                    {
                        Header: t('tabel_number'),
                        accessor: 'tabel_number',
                    },
                    {
                        Header: t('drove'),
                        accessor: 'drove',
                    },
                    {
                        Header: t('start_time'),
                        accessor: 'start_time',
                    },
                    {
                        Header: t('interval'),
                        accessor: 'interval',
                    },
                    {
                        Header: t('idle'),
                        accessor: 'idle',
                    },
                    {
                        Header: t('fact'),
                        accessor: 'fact',
                    },
                    {
                        Header: t('plan'),
                        accessor: 'plan',
                    },
                    {
                        Header: t('diff'),
                        accessor: 'diff',
                    },
                ],
            },
        ];
    }, [t]);
    return (
        <div className={cx(s.controlIntervalTables, 'wrapperWithCustomScroll')}>
            <KppTable columns={tableColumn1} data={data} />
            <KppTable columns={tableColumn1} data={data} />
        </div>
    );
};
