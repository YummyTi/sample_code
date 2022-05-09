import TablePageWrapper from '@widgets/TablePageWrapper';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import shallow from 'zustand/shallow';

import useVRoutes from '@api/route/hooks';
import {RightSide} from '@features/vehicle_routes/components';
import {useEditRouteStore} from '@store/edit_route';
import {useMainStore} from '@store/main';
import {useRouteStore} from '@store/route';

import styles from './index.module.scss';
import {useColumns} from './useColumns';

const VehicleRoutesPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {isPLoading} = useVRoutes();
    const setTab = useEditRouteStore((state) => state.setTab);
    const {
        routes,
        text,
        total,
        page,
        selectedRoutes,
        setSelectedRoutes,
        setPage,
        setText,
    } = useRouteStore((state) => state, shallow);
    const openSide = useMainStore((state) => state.openSide);
    const columns = useColumns();

    const onAdd = () => {
        setTab('1');
        navigate('edit_vehicleRoute', {
            state: {
                tab: '1',
                newRoute: true,
            },
        });
    };

    return (
        <TablePageWrapper
            title={t('list_routes')}
            saveLabel={t('add_route')}
            onAdd={onAdd}
            customStyles={styles}
            isLoading={isPLoading}
            searchTerm={text}
            setSearchTerm={setText}
            totalCount={total}
            page={page}
            setPage={setPage}
            comingData={routes}
            columns={columns}
            selected={selectedRoutes}
            setSelected={setSelectedRoutes}
        >
            {openSide && <RightSide />}
        </TablePageWrapper>
    );
};

export default VehicleRoutesPage;
