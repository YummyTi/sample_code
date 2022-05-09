import TablePageWrapper from '@widgets/TablePageWrapper';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useBusModels from '@api/bus_model/hooks';
import {AddBusModel, RightSide} from '@features/bus_model_page';
import Innerlayout from '@shared/hoc/Innerlayout';
import {useBusModelStore} from '@store/bus_model';
import {useMainStore} from '@store/main';

import {vehicleMenuItems} from './routes';
import {useColumns} from './useColumns';

const VehicleModel = () => {
    const {t} = useTranslation();
    const {isLoading} = useBusModels();
    const {openSide, open} = useMainStore((state) => state, shallow);
    const {
        busModels,
        totalBusModelCount,
        page,
        selectedBusModel,
        setSelectedBusModel,
        setPage,
    } = useBusModelStore((state) => state, shallow);
    const columns = useColumns();

    return (
        <TablePageWrapper
            title={t('vehicle_model_list')}
            isLoading={isLoading}
            totalCount={totalBusModelCount}
            page={page}
            setPage={setPage}
            comingData={busModels}
            columns={columns}
            selected={selectedBusModel}
            setSelected={setSelectedBusModel}
            noSearch
        >
            <Innerlayout list={vehicleMenuItems} />

            {open && <AddBusModel />}
            {openSide && <RightSide />}
        </TablePageWrapper>
    );
};

export default VehicleModel;
