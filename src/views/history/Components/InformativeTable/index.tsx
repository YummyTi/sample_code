import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import InformativeTable from './Components/Table/Table';

export const InformativeTableWrapper = () => {
    const {t} = useTranslation();
    const lostSignalColumn = useMemo(() => {
        return [
            {
                Header: t('loose_signal'),
                columns: [
                    {
                        Header: t('from'),
                        accessor: 'from',
                    },
                    {
                        Header: t('to'),
                        accessor: 'to',
                    },
                    {
                        Header: t('duration'),
                        accessor: 'duration',
                    },
                    {
                        Header: t('races'),
                        accessor: 'races',
                    },
                ],
            },
        ];
    }, []);

    const notInlinelColumn = useMemo(() => {
        return [
            {
                Header: t('not_inline'),
                columns: [
                    {
                        Header: t('from'),
                        accessor: 'from',
                    },
                    {
                        Header: t('to'),
                        accessor: 'to',
                    },
                    {
                        Header: t('duration'),
                        accessor: 'duration',
                    },
                    {
                        Header: t('races'),
                        accessor: 'races',
                    },
                ],
            },
        ];
    }, []);

    const speedOverlColumn = useMemo(() => {
        return [
            {
                Header: t('speed_over'),
                columns: [
                    {
                        Header: t('from'),
                        accessor: 'from',
                    },
                    {
                        Header: t('to'),
                        accessor: 'to',
                    },
                    {
                        Header: t('duration'),
                        accessor: 'duration',
                    },
                    {
                        Header: t('speed'),
                        accessor: 'races',
                    },
                ],
            },
        ];
    }, []);

    const lostSignalData: any[] = [
        {
            from: '20:10:31',
            to: '1:46 AM',
            duration: '8:52 AM',
            races: 34,
        },
        {
            from: '4:02:11',
            to: '7:55 AM',
            duration: '7:25 PM',
            races: 31,
        },
        {
            from: '4:02:11',
            to: '7:55 AM',
            duration: '7:25 PM',
            races: 31,
        },
        {
            from: '4:02:11',
            to: '7:55 AM',
            duration: '7:25 PM',
            races: 31,
        },
    ];
    return (
        <>
            <div className="historyTableWrapper">
                <InformativeTable
                    columns={lostSignalColumn}
                    data={lostSignalData}
                />
            </div>

            <div className="historyTableWrapper">
                <InformativeTable
                    columns={notInlinelColumn}
                    data={lostSignalData}
                />
            </div>

            <div className="historyTableWrapper">
                <InformativeTable
                    columns={speedOverlColumn}
                    data={lostSignalData}
                />
            </div>
        </>
    );
};
