import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import CircularProgress from '@mui/material/CircularProgress';
import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useLocationPermission from '@src/shared/hooks/useLocationPermission';

import useExRouteExchange from '@api/route_exchange/hooks';
import useByRoute from '@api/route_exchange/useByRoute';
import CMButton from '@components/CMButton/index';
import {localNotification} from '@shared/helpers';
import {useOrderStore} from '@store/order';

import CardItem from '../CardItem';
import EditOrder from '../EditOrder';
import {ExportXLSX} from './exportCsv';
import styles from './index.module.scss';

const {notifyWaring} = localNotification;

const Orders = () => {
    useExRouteExchange();
    const {t} = useTranslation();
    const {
        fetchCount,
        setFetchUp,
        setOrder,
        setOpenM,
        setOpenS,
        openS,
        routeId,
        expanded,
    } = useOrderStore((state) => ({...state}), shallow);
    const {isLoading, isFetching, cardDatas} = useByRoute();
    const {canEdit} = useLocationPermission();

    const handleCloseModal = () => {
        setOpenM(false);
    };

    console.log(openS, 'openS');
    // console.log(cardDatas, 'card datas');

    return (
        <div className={styles.container}>
            <EditOrder />
            <div className="flex__space">
                <h4 className="sub_head_text">{t('daily_reinforcement')}</h4>
            </div>
            <div className={cx('flex__end', 'gap_24')}>
                {canEdit && (
                    <CMButton
                        className={cx('btn__success', 'f_12')}
                        icon={<AddCircleOutlineRoundedIcon />}
                        text={t('add')}
                        onClick={() => {
                            if (routeId === 0 || !expanded) {
                                notifyWaring(t('please_select_route'));
                            } else {
                                setOpenS(true);
                            }
                        }}
                    />
                )}
                <CMButton
                    className={cx('btn__primary__dark', 'f_12')}
                    icon={<CachedRoundedIcon />}
                    text={t('reload')}
                    onClick={() => setFetchUp(fetchCount + 1)}
                />
                <ExportXLSX fileName={t('bus_order')} />
            </div>
            {isLoading || isFetching ? (
                <div className="center__file">
                    <CircularProgress />
                </div>
            ) : cardDatas?.length === 0 || !cardDatas ? (
                <div className="center">
                    <p>{t('no_data')}</p>
                </div>
            ) : (
                <div
                    className={cx(
                        'grid__wrap',
                        'rg_16',
                        'cg_30',
                        'v__overflow',
                        'h_72',
                        'p_10',
                    )}
                >
                    {cardDatas.map((item, index) => {
                        return (
                            <CardItem
                                key={item.graph_id}
                                index={index + 1}
                                handleClick={() => {
                                    if (routeId === 0 || !expanded) {
                                        notifyWaring(t('please_select_route'));
                                    } else {
                                        setOrder(item);
                                        setOpenM(true);
                                    }
                                }}
                                {...item}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Orders;
