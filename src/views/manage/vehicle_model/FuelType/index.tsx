import TablePageWrapper from '@widgets/TablePageWrapper';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useFuelTypeList from '@api/bus_model/fuelHooks';
import {AddFuelType, FuelRightSide} from '@features/fuel_type';
import Innerlayout from '@shared/hoc/Innerlayout';
import {useBusModelStore} from '@store/bus_model';
import {useMainStore} from '@store/main';

import {vehicleMenuItems} from '../routes';
import {useColumns} from './useColumns';

const FuelType = () => {
    const {t} = useTranslation();
    const {isLoading} = useFuelTypeList();
    const {openSide, open} = useMainStore((state) => state, shallow);
    const {fuelTypeList, selectedFuelType, setSelectedFuelType} =
        useBusModelStore((state) => state, shallow);
    const columns = useColumns();

    return (
        <TablePageWrapper
            noSearch
            noPagination
            title={t('fuel_type')}
            isLoading={isLoading}
            comingData={fuelTypeList}
            columns={columns}
            selected={selectedFuelType}
            setSelected={setSelectedFuelType}
        >
            <Innerlayout list={vehicleMenuItems} />

            {open && <AddFuelType />}
            {openSide && <FuelRightSide />}
        </TablePageWrapper>
    );
};

export default FuelType;
