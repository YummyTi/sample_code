import {Tooltip} from '@mui/material';
import cx from 'classnames';
import dayjs from 'dayjs';
import {useMemo} from 'react';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import HistoryComponent from '@features/vehicle_routes/components/HistoryComponent';
import {useEditRouteStore} from '@store/edit_route';

import ForwardIcon from '@images/svgs/ForwardIcon';

export const useColumns = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const setTab = useEditRouteStore((state) => state.setTab);
    const setRouteId = useEditRouteStore((state) => state.setRouteId);

    const handleNavigate = (
        routeId: '1' | '2' | '3' | '4' | '5' | '6',
        id: any,
    ) => {
        setTab(routeId);
        setRouteId(id);
        navigate('edit_vehicleRoute', {
            state: {
                tab: routeId,
                routeId: id,
            },
        });
    };

    const columns: any = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'route_id',
                width: 30,
            },
            {
                Header: t('title').toUpperCase(),
                accessor: 'route_name',
                width: 100,
            },
            {
                Header: t('edit_route').toUpperCase(),
                accessor: 'saved_details',
                Cell: (props: any) => {
                    const {
                        saved_etalon,
                        saved_passport,
                        saved_points,
                        saved_protocol,
                        saved_raspisaniya,
                        route_id,
                    } = props.row.original;
                    return (
                        <div
                            className="status__list"
                            onClick={(e: any) => e.stopPropagation()}
                        >
                            <Tooltip
                                placement="top"
                                title={`${t('passport')}`}
                                arrow
                            >
                                <div
                                    onClick={() =>
                                        handleNavigate('1', route_id)
                                    }
                                    className={cx('status__item', [
                                        props.value && 'status__item__success',
                                    ])}
                                >
                                    1
                                </div>
                            </Tooltip>
                            <ForwardIcon className="status__icon" />
                            <Tooltip
                                placement="top"
                                title={`${t('etalon')}`}
                                arrow
                            >
                                <div
                                    onClick={() =>
                                        handleNavigate('2', route_id)
                                    }
                                    className={cx('status__item', [
                                        saved_etalon && 'status__item__success',
                                    ])}
                                >
                                    2
                                </div>
                            </Tooltip>

                            <ForwardIcon className="status__icon" />
                            <Tooltip
                                placement="top"
                                title={`${t('scheme')}`}
                                arrow
                            >
                                <div
                                    onClick={() =>
                                        handleNavigate('3', route_id)
                                    }
                                    className={cx('status__item', [
                                        saved_passport &&
                                            'status__item__success',
                                    ])}
                                >
                                    3
                                </div>
                            </Tooltip>
                            {/* <ForwardIcon className="status__icon" /> */}
                            {/* <Tooltip
                                placement="top"
                                title={`${t('details')}`}
                                arrow
                            >
                                <div
                                    onClick={() =>
                                        handleNavigate('4', route_id)
                                    }
                                    className={cx('status__item', [
                                        saved_points && 'status__item__success',
                                    ])}
                                >
                                    4
                                </div>
                            </Tooltip> */}
                            <ForwardIcon className="status__icon" />
                            <Tooltip
                                placement="top"
                                title={`${t('protocol')}`}
                                arrow
                            >
                                <div
                                    onClick={() =>
                                        handleNavigate('4', route_id)
                                    }
                                    className={cx('status__item', [
                                        saved_protocol &&
                                            'status__item__success',
                                    ])}
                                >
                                    4
                                </div>
                            </Tooltip>
                            <ForwardIcon className="status__icon" />
                            <Tooltip
                                title={`${t('schedule')}`}
                                placement="top"
                                arrow
                            >
                                <div
                                    onClick={() =>
                                        handleNavigate('5', route_id)
                                    }
                                    className={cx('status__item', [
                                        saved_raspisaniya &&
                                            'status__item__success',
                                    ])}
                                >
                                    5
                                </div>
                            </Tooltip>
                        </div>
                    );
                },
            },
            {
                Header: t('history_change').toUpperCase(),
                accessor: 'user_name',
                Cell: (props: any) => {
                    const {route_name} = props.row.original;
                    return (
                        <div
                            // onClick={handleHistory}
                            onClick={(e: any) => e.stopPropagation()}
                            id="mouse-over-popover"
                            className="user__item"
                        >
                            <p>{props.value}</p>
                            <HistoryComponent routeName={route_name} />
                        </div>
                    );
                },
            },
            {
                Header: t('date').toUpperCase(),
                accessor: 'last_date',
                Cell: (props: any) => {
                    return (
                        <p>{dayjs(props.value).format('DD-MM-YYYY HH:mm')}</p>
                    );
                },
            },
        ],
        [t],
    );

    return columns;
};
