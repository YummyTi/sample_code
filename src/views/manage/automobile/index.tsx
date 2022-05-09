import TablePageWrapper from '@widgets/TablePageWrapper';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import usePark from '@api/park/hooks';
import useTotalPark from '@api/park/totalPark';
import {AddAutomobile, RightSide} from '@features/automobile';
import {useMainStore} from '@store/main';
import {useParkStore} from '@store/park';

import {useColumns} from './useColumns';

const AutoMobile = () => {
    const {t} = useTranslation();
    const total = useTotalPark();
    const park = usePark();
    const {open, openSide} = useMainStore((state) => state, shallow);
    const {
        parks,
        selectedPark,
        page,
        parkTotalCount,
        term,
        setPage,
        setTerm,
        setSelectedPark,
    } = useParkStore();
    const columns = useColumns();

    return (
        <TablePageWrapper
            title={t('list_autostation')}
            isLoading={park.isLoading}
            searchTerm={term}
            setSearchTerm={setTerm}
            totalCountLoading={total.isLoading}
            totalCount={parkTotalCount}
            page={page}
            setPage={setPage}
            comingData={parks}
            columns={columns}
            selected={selectedPark}
            setSelected={setSelectedPark}
        >
            {open && <AddAutomobile />}
            {openSide && <RightSide />}
        </TablePageWrapper>
    );
};

export default AutoMobile;
