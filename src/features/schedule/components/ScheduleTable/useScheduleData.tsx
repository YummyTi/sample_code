import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {useScheduleStore} from '@src/shared/store/schedule';

const useScheduleData = () => {
    const {newData} = useScheduleStore((state) => ({...state}), shallow);

    console.log(newData, 'new Data');

    const {t} = useTranslation();

    const data = React.useMemo(
        () =>
            newData.map((item: any) => ({
                ...item,
                id: item.id,
                race: +item.raceCount,
                exit: item.garageBeginTime,
                busStop: item.kppBegin.name,
                comeback: item.garageEndTime,
                day: item.dayType,
                busStopEnd: item.kppEnd.name,
                time: item.kppBeginTime,
                timeEnd: item.kppEndTime,
                simple: item.prostoy,
                interval: item.interval,
                lunchFrom: item.lunch1Begin,
                lunchTo: item.lunch1End,
                busLunchStop: item.kppLunch1.name,
                dinnerFrom: item.lunch2Begin,
                dinnerhTo: item.lunch2End,
                busDinnerStop: item.kppLunch2.name,
            })),
        [newData],
    );

    const columns = React.useMemo(
        () => [
            {
                Header: t('graphic'),
                // accessor: 'id',
                enableRowSpan: true,
                rowSpan: 2,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: 'id',
                        enableRowSpan: true,
                        displayNone: true,
                    },
                ],
            },
            {
                Header: t('days_multi'),
                accessor: 'dayType',
                rowSpan: 2,

                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: 'day',
                        displayNone: true,
                        Cell: (props: any) => {
                            if (
                                props.value === 'pon' ||
                                props.value === 'MONDAY'
                            ) {
                                return <div>{t('md')}</div>;
                            } else if (
                                props.value === 'bud' ||
                                props.value === 'OTHER'
                            ) {
                                return (
                                    <div>
                                        {t('td')}-{t('fd')}
                                    </div>
                                );
                            } else if (
                                props.value === 'sub' ||
                                props.value === 'SATURDAY'
                            ) {
                                return <div>{t('std')}</div>;
                            } else {
                                return <div>{t('sd')}</div>;
                            }
                        },
                    },
                ],
            },
            {
                Header: t('race'),
                accessor: 'race',
                rowSpan: 2,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: 'race',
                        displayNone: true,
                    },
                ],
            },
            {
                Header: t('working_hours'),
                columns: [
                    {
                        Header: t('departure'),
                        accessor: 'exit',
                    },
                    {
                        Header: t('check_in'),
                        accessor: 'comeback',
                    },
                ],
            },
            {
                Header: t('begin_work'),
                columns: [
                    {
                        Header: t('time'),
                        accessor: 'time',
                        Cell: (props: any) => {
                            if (props.value) {
                                return props.value;
                            } else {
                                return '-';
                            }
                        },
                    },
                    {
                        Header: t('busStop'),
                        accessor: 'busStop',
                    },
                ],
            },
            {
                Header: t('end_work'),
                columns: [
                    {
                        Header: t('time'),
                        accessor: 'timeEnd',
                    },
                    {
                        Header: t('busStop'),
                        accessor: 'busStopEnd',
                    },
                ],
            },
            {
                Header: t('simple'),
                accessor: 'simple',
                rowSpan: 2,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: 'simple',
                        displayNone: true,
                    },
                ],
            },
            {
                Header: t('interval'),
                accessor: 'interval',
                rowSpan: 2,
                columns: [
                    {
                        Header: 'Not visible header 3',
                        accessor: 'interval',
                        displayNone: true,
                    },
                ],
            },
            {
                Header: t('lunch_time'),
                columns: [
                    {
                        Header: t('from'),
                        accessor: 'lunchFrom',
                    },
                    {
                        Header: t('to'),
                        accessor: 'lunchTo',
                    },
                    {
                        Header: t('busStop'),
                        accessor: 'busLunchStop',
                    },
                ],
            },
            {
                Header: `${t('lunch_time')} 2`,
                columns: [
                    {
                        Header: t('from'),
                        accessor: 'dinnerFrom',
                    },
                    {
                        Header: t('to'),
                        accessor: 'dinnerhTo',
                    },
                    {
                        Header: t('busStop'),
                        accessor: 'busDinnerStop',
                    },
                ],
            },
        ],
        [t],
    );
    return {
        data,
        columns,
        newData,
    };
};

export default useScheduleData;
