import TablePageWrapper from '@widgets/TablePageWrapper';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useAutoTransport from '@api/autotransport/hooks';
import useTotalCountTrans from '@api/autotransport/totalCountTrans';
import {RightSide} from '@features/transports';
import Filter from '@shared/components/Filter';
import {useAutoTransStore} from '@store/autotransport';
import {useMainStore} from '@store/main';

import {useColumns} from './useColumns';

const TransportsPage = () => {
    const {t} = useTranslation();
    const {openSide} = useMainStore((state) => state, shallow);
    const {isLoading} = useAutoTransport();
    const {isLoading: totalCountLoading} = useTotalCountTrans();
    const {
        autoTrans,
        searchTerm,
        setSearchTerm,
        page,
        totalCountTrans,
        setPage,
        selectedAutoTrans,
        setSelectedAutoTrans,
        filters,
        setFilters,
    } = useAutoTransStore((state) => state, shallow);
    const columns = useColumns();

    return (
        <TablePageWrapper
            title={t('vehicle_list')}
            isLoading={isLoading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            totalCountLoading={totalCountLoading}
            totalCount={totalCountTrans}
            page={page}
            setPage={setPage}
            comingData={autoTrans}
            columns={columns}
            selected={selectedAutoTrans}
            setSelected={setSelectedAutoTrans}
            Filter={() => <Filter filters={filters} setFilters={setFilters} />}
        >
            {openSide && <RightSide />}
        </TablePageWrapper>
    );
};

export default TransportsPage;
