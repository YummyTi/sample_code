import {ButtonBase} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {RouteExchangeModel} from '@src/shared/models/route_exchange_model';

import {helper} from '@shared/helpers';

const {getDayCh} = helper;
interface IProps extends RouteExchangeModel {
    index: number;
    handleClick: () => void;
}

const CardItem = ({
    conductor_name,
    created,
    even,
    from_time,
    gos,
    graph_id,
    model,
    race,
    station,
    tab_num_con,
    tab_number,
    to_time,
    user_name,
    driver_name,
    index,
    handleClick,
}: IProps) => {
    const {t} = useTranslation();

    return (
        <ButtonBase onClick={handleClick} className="card__btn">
            <div className="card__wrapper">
                <div className="order__card__header">
                    <div className={cx('order__card__id', 'violet__text')}>
                        {index}
                    </div>
                    <div className="order__card__head__side">
                        <div className="order__card__item">
                            <p className="order__card__text">{t('time')}</p>
                            <div className="order__card__chip">
                                {from_time}-{to_time}
                            </div>
                        </div>

                        <div className="order__card__item">
                            <p className="order__card__text">{t('race')}</p>
                            <div className="order__card__chip">{race}</div>
                        </div>
                        <Tooltip arrow placement="top" title={user_name}>
                            <div
                                className={cx(
                                    'rounded',
                                    'bg__gray',
                                    'p_5',
                                    'f_12',
                                )}
                            >
                                {user_name.slice(0, 2).toUpperCase()}
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <div className="order__card__body">
                    <div className="order__card__item">
                        <p className="order__card__text">{t('g_num')}</p>
                        <div className="order__card__chip">{tab_num_con}</div>
                        <div className="order__card__chip">{model}</div>
                        <div className="order__card__chip">{gos}</div>
                    </div>
                    <div className="order__card__row">
                        <p className="order__card__text">{t('start__from')}</p>
                        <div className="order__card__chip">{station}</div>
                    </div>
                </div>
                <div className="order__card__footer">
                    <div className="order__card__row">
                        <div className="order__card__item">
                            <p className="order__card__text">{t('tab_num')}</p>
                            <div className="order__card__chip">
                                {tab_number}
                            </div>
                        </div>
                        <div className="order__card__item">
                            <p className="order__card__text">{t('days_ch')}</p>
                            <div className="order__card__chip">
                                {getDayCh(even)}
                            </div>
                        </div>
                    </div>
                    <div className="order__card__row">
                        <p className="order__card__text">{t('driver_name')}</p>
                        <div className="order__card__chip">{driver_name}</div>
                    </div>
                </div>
            </div>
        </ButtonBase>
    );
};

export default CardItem;
