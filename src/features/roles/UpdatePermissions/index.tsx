import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import PermissionTable from '@src/features/permission/components/PermissionTable';
import useRoleMutate from '@src/shared/api/role/mutations';
import DialogWrapper from '@src/shared/components/CustomDialog';
import {useMainStore} from '@src/shared/store/main';
import {usePermissionStore} from '@src/shared/store/permission';
import {useRoleStore} from '@src/shared/store/role';

import s from './index.module.scss';

const UpdatePerms = () => {
    const {t} = useTranslation();
    const {handleSavePermissionRole} = useRoleMutate();
    const {openUpdate, handleOpenUpdate} = useMainStore(
        (state) => state,
        shallow,
    );
    const selectedRoles = useRoleStore((state) => state.selectedRoles);
    const state = usePermissionStore((state) => state.state);

    const handlePermissions = () => {
        handleSavePermissionRole.mutate({
            roleId: selectedRoles[0]?.id,
            permissions: Object.keys(state)
                .filter((item) => +state[item].join('') !== 0)
                .map((item) => {
                    return {
                        url: item === 'statistic' ? 'statistics' : item,
                        permission: +state[item].join(''),
                    };
                }),
        });
    };

    useEffect(() => {
        if (handleSavePermissionRole.isSuccess) {
            handleOpenUpdate(false);
        }
    }, [handleSavePermissionRole.isSuccess]);

    return (
        <DialogWrapper
            title={t('permissions')}
            open={openUpdate}
            onClose={() => handleOpenUpdate(false)}
            save={handlePermissions}
            width="800px"
            isLoading={handleSavePermissionRole.isLoading}
        >
            <div className={s.bodyWrapper}>
                <PermissionTable />
            </div>
        </DialogWrapper>
    );
};

export default UpdatePerms;
