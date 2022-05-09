import Chip from '@mui/material/Chip';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import RightSideWrapper from '@src/shared/components/RightSideWrapper';
import {SideBar} from '@src/shared/components/SideBar';
import DeleteDialog from '@src/shared/components/SureToDeleteDialog';

import useRoleMutate from '@api/role/mutations';
import {ROLENAME} from '@shared/helpers/constants';
import {useAuthStore} from '@store/auth';
import {useMainStore} from '@store/main';
import {useRoleStore} from '@store/role';

import usePermissionRole from '../libs/usePermissionRole';
import UpdatePerms from '../UpdatePermissions';
import ListItem from './ListItem';

const RoleRightSide = () => {
    const [openModal, setOpenModal] = useState(false);

    const {t} = useTranslation();
    const {handleDelete: deleteRole} = useRoleMutate();
    const {setOpenSide, openSide, openUpdate, handleOpenUpdate} = useMainStore(
        (state) => state,
        shallow,
    );
    const userInfo = useAuthStore((state) => state.userInfo);
    const {selectedRoles, setSelectedRoles, setRefetch, refetch} = useRoleStore(
        (state) => state,
        shallow,
    );
    usePermissionRole();

    const handleClose = () => {
        setSelectedRoles([]);
        setOpenSide(false);
    };

    const handleDelete = (user: typeof selectedRoles[0]) => {
        const filteredUsers = selectedRoles.filter(
            (item) => item.id !== user.id,
        );
        setSelectedRoles(filteredUsers);
        setOpenSide(true);
    };

    useEffect(() => {
        if (deleteRole.isSuccess) {
            setOpenSide(false);
            setSelectedRoles([]);
            setOpenModal(false);
            setRefetch(refetch + 1);
        }
    }, [deleteRole.isSuccess]);

    const deleteUsers = () => {
        const ids = selectedRoles.map((user) => user.id);
        deleteRole.mutate(ids);
    };

    const toggleDeleteModal = () => {
        setOpenModal(!openModal);
    };

    return (
        <>
            <SideBar
                maxWidth="450px"
                onOutSideClick={() => null}
                isOpen={
                    openSide &&
                    selectedRoles?.length > 0 &&
                    !deleteRole.isSuccess
                }
            >
                <RightSideWrapper
                    title={t('chosen_autoparks')}
                    onEdit={() => handleOpenUpdate(true)}
                    handleClose={handleClose}
                    onDelete={toggleDeleteModal}
                    hideEdit={
                        selectedRoles?.length > 1 ||
                        userInfo.roleName !== ROLENAME.roleName
                    }
                >
                    <div style={{paddingTop: '16px'}}>
                        <div className="body__side">
                            {selectedRoles.length > 1 ? (
                                <div className="chips__container">
                                    {selectedRoles.map((user) => (
                                        <Chip
                                            key={user?.id}
                                            label={user?.name}
                                            onDelete={() => handleDelete(user)}
                                        />
                                    ))}
                                </div>
                            ) : selectedRoles.length === 1 ? (
                                <div className="info__container">
                                    <ListItem
                                        title={t('name')}
                                        value={selectedRoles[0]?.name}
                                    />

                                    <ListItem
                                        title={t('description')}
                                        value={selectedRoles[0]?.remark}
                                    />
                                    <div className="listItem">
                                        <div className="listItem__title">
                                            {t('access')}:{' '}
                                        </div>
                                        <div className="listItem__wrapper">
                                            {selectedRoles[0]?.permissions?.map(
                                                (permission, index: number) => (
                                                    <Chip
                                                        key={index}
                                                        label={t(
                                                            permission.url,
                                                        )}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </RightSideWrapper>
            </SideBar>

            {openModal && (
                <DeleteDialog
                    open={openModal}
                    close={toggleDeleteModal}
                    handleDelete={deleteUsers}
                    loading={deleteRole.isLoading}
                >
                    <div className="body__side">
                        {selectedRoles.map((user) => (
                            <Chip
                                key={user?.id}
                                label={user?.name}
                                onDelete={() => handleDelete(user)}
                            />
                        ))}
                    </div>
                </DeleteDialog>
            )}

            {openUpdate && <UpdatePerms />}
        </>
    );
};

export default RoleRightSide;
