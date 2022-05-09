import CircularProgress from '@mui/material/CircularProgress';
import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useEmployees from '@api/employees/hooks';
import usePark from '@api/park/hooks';
import useStations from '@api/station/hooks';
import DayPickerComponent from '@components/DayPicker';
import OrderList from '@features/order/components/OrderList';
import Orders from '@features/order/components/Orders';
import SaveOrder from '@features/order/components/SaveOrder';
import {useOrderStore} from '@store/order';

const OrderPage = () => {
    useEmployees();
    const {t} = useTranslation();
    const {isLoading: parkLoading, isFetching} = usePark();
    const {date, setDate, routeId} = useOrderStore(
        (state) => ({...state}),
        shallow,
    );
    useStations(routeId);

    return (
        <div className="order__wrapper">
            <div className="order__header">
                <div className="headText">{t('bus_order')}</div>
                <DayPickerComponent value={date} setValue={setDate} />
            </div>
            {parkLoading ? (
                <div className={cx('center__file', 'full__height')}>
                    <CircularProgress />
                </div>
            ) : (
                <div className="order__container">
                    <div className="order__side">
                        <div className="park__list">
                            <div className="park__list__head">
                                <h4>{t('auto_parks')}</h4>
                            </div>
                            {isFetching ? (
                                <div className="center__file">
                                    <CircularProgress />
                                </div>
                            ) : (
                                <OrderList />
                            )}
                        </div>
                    </div>

                    <div className="order__side">
                        <Orders />
                    </div>
                </div>
            )}
            <SaveOrder />
        </div>
    );
};

export default OrderPage;
