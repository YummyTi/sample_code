import TablePageWrapper from '@widgets/TablePageWrapper';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useRoles from '@api/role/hooks';
import RoleAddModal from '@features/roles/RoleAddModal';
import RoleRightSide from '@features/roles/RoleRightSide';
import Innerlayout from '@shared/hoc/Innerlayout';
import {useRoleStore} from '@shared/store/role';
import {useMainStore} from '@store/main';

import {menuItems} from '../routes';
import {useColumns} from './useColumns';

const RolesPage = () => {
    const {t} = useTranslation();
    const {data, isLoading} = useRoles();
    const {roles, selectedRoles, setSelectedRoles, page, setPage} =
        useRoleStore((state) => state, shallow);
    const {open, openSide} = useMainStore((state) => state, shallow);
    const columns = useColumns();

    return (
        <TablePageWrapper
            title={t('roleList')}
            isLoading={isLoading}
            totalCount={data?.totalCount}
            page={page}
            setPage={setPage}
            comingData={roles}
            columns={columns}
            selected={selectedRoles}
            setSelected={setSelectedRoles}
            noSearch
        >
            <Innerlayout list={menuItems} />
            {open && <RoleAddModal />}
            {openSide && <RoleRightSide />}
        </TablePageWrapper>
    );
};

export default RolesPage;
