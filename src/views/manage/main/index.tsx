import TablePageWrapper from '@widgets/TablePageWrapper';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useUsersData from '@api/access_rights/hooks';
import ActiveSelect from '@features/main/ActiveSelect';
import RightSide from '@features/main/RightSide';
import UserAdd from '@features/main/UserAdd';
import {ROLENAME} from '@shared/helpers/constants';
import Innerlayout from '@shared/hoc/Innerlayout';
import {useAccessStore} from '@shared/store/access_rights';
import {useAuthStore} from '@store/auth';
import {useMainStore} from '@store/main';

import {menuItems, userRoutes} from './routes';
import {useColumns} from './useColumns';

const Main = () => {
    const {t} = useTranslation();
    const {
        usersList,
        totalCountUser,
        page,
        searchTerm,
        selectedUsers,
        setSelectedUsers,
        setSearchTerm,
        setPage,
    } = useAccessStore((state) => state, shallow);
    const {openSide, open} = useMainStore((state) => state, shallow);
    const userInfo = useAuthStore((state) => state.userInfo);
    const {isLoading} = useUsersData();
    const columns = useColumns();

    const routes =
        userInfo.roleName === ROLENAME.roleName ? menuItems : userRoutes;

    return (
        <TablePageWrapper
            title={t('users_list')}
            isLoading={isLoading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            totalCount={totalCountUser}
            page={page}
            setPage={setPage}
            comingData={usersList}
            columns={columns}
            selected={selectedUsers}
            setSelected={setSelectedUsers}
            Filter={() => <ActiveSelect />}
        >
            <Innerlayout list={routes} />

            {open && <UserAdd />}
            {openSide && <RightSide />}
        </TablePageWrapper>
    );
};

export default Main;
