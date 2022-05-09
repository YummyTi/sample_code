import Chip from '@mui/material/Chip';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import RightSideWrapper from '@src/shared/components/RightSideWrapper';

import useAccessMutate from '@api/access_rights/mutations';
import userParkHook from '@api/access_rights/userParkHook';
import {SideBar} from '@components/SideBar';
import DeleteDialog from '@components/SureToDeleteDialog';
import {useAccessStore} from '@store/access_rights';
import {useMainStore} from '@store/main';

import UpdateUserFormField from '../UserUpdate';
import CardItem from './CardItem';

const RightSide = () => {
    const [openModal, setOpenModal] = useState(false);

    const {t} = useTranslation();
    const {setSelectedUsers, selectedUsers} = useAccessStore(
        (state) => ({...state}),
        shallow,
    );
    const {setOpenSide, openSide, handleOpenUpdate, openUpdate} = useMainStore(
        (state) => state,
        shallow,
    );
    const {deleteUserList} = useAccessMutate();
    const {loading, data} = userParkHook(selectedUsers[0]?.id);

    const handleClose = () => {
        setSelectedUsers([]);
        setOpenSide(false);
    };

    const handleDelete = (user: typeof selectedUsers[0]) => {
        if (selectedUsers.length === 1) {
            setOpenModal(false);
        }
        const filteredUsers = selectedUsers.filter(
            (item) => item.id !== user.id,
        );
        setSelectedUsers(filteredUsers);
        setOpenSide(true);
    };

    useEffect(() => {
        if (deleteUserList.isSuccess) {
            setOpenModal(false);
        }
    }, [deleteUserList.isSuccess]);

    const deleteUsers = () => {
        const selectedIds = selectedUsers.map((user) => user.id);
        deleteUserList.mutate(selectedIds);
    };

    const toggleDeleteModal = () => {
        setOpenModal(!openModal);
    };

    return (
        <>
            <SideBar
                maxWidth="450px"
                onOutSideClick={() => null}
                isOpen={openSide && selectedUsers?.length > 0}
            >
                <RightSideWrapper
                    title={t('chosen_models')}
                    onEdit={() => handleOpenUpdate(true)}
                    handleClose={handleClose}
                    onDelete={toggleDeleteModal}
                    hideEdit={selectedUsers?.length > 1}
                >
                    <div style={{paddingTop: '16px'}}>
                        <div className="body__side">
                            {selectedUsers.length > 1 ? (
                                <div className="chips__container">
                                    {selectedUsers.map(
                                        (user, index: number) => (
                                            <Chip
                                                key={index}
                                                label={user?.fullname}
                                                onDelete={() =>
                                                    handleDelete(user)
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            ) : selectedUsers.length === 1 ? (
                                <div className="info__container">
                                    <CardItem isLoading={loading} data={data} />
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
                    loading={deleteUserList.isLoading}
                >
                    <div className="body__side">
                        {selectedUsers.map((user, index: number) => (
                            <Chip
                                key={index}
                                label={user?.fullname}
                                onDelete={() => handleDelete(user)}
                            />
                        ))}
                    </div>
                </DeleteDialog>
            )}

            {openUpdate && <UpdateUserFormField />}
        </>
    );
};

export default RightSide;
