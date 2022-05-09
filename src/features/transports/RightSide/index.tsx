import Chip from '@mui/material/Chip';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import RightSideWrapper from '@src/shared/components/RightSideWrapper';

import {useAutoTransMutate} from '@api/autotransport/mutations';
import {SideBar} from '@components/SideBar';
import DeleteDialog from '@components/SureToDeleteDialog';
import {IAutoTransModel} from '@models/autotrans_model';
import {useAutoTransStore} from '@store/autotransport';
import {useMainStore} from '@store/main';

import AddAndUpdateForms from '../AddUpdateForms';
import ListItem from './ListItem';

const RightSide = () => {
    const [openModal, setOpenModal] = useState(false);

    const {t} = useTranslation();
    const {deleteAutoTrans} = useAutoTransMutate();
    const {selectedAutoTrans, setSelectedAutoTrans} = useAutoTransStore(
        (state) => state,
        shallow,
    );
    const {openSide, setOpenSide, handleOpenUpdate} = useMainStore(
        (state) => state,
        shallow,
    );

    useEffect(() => {
        if (deleteAutoTrans.isSuccess) {
            setOpenModal(false);
        }
    }, [deleteAutoTrans.isSuccess]);

    const handleClose = () => {
        setSelectedAutoTrans([]);
        setOpenSide(false);
    };

    const removeItems = (elem: typeof selectedAutoTrans[0]) => {
        if (selectedAutoTrans.length === 1) {
            setOpenModal(false);
        }

        const filteredAutoTrans = selectedAutoTrans.filter(
            (item) => item.col1 !== elem.col1,
        );
        setSelectedAutoTrans(filteredAutoTrans);
        setOpenSide(true);
    };

    const onDelete = () => {
        selectedAutoTrans.forEach((elem) => {
            deleteAutoTrans.mutate(elem.tracker);
        });
    };

    const toggleDeleteModal = () => setOpenModal(!openModal);

    return (
        <>
            <SideBar
                maxWidth="450px"
                onOutSideClick={() => null}
                isOpen={openSide && selectedAutoTrans?.length > 0}
            >
                <RightSideWrapper
                    title={t('chosen_autotransports')}
                    onEdit={() => handleOpenUpdate(true)}
                    handleClose={handleClose}
                    onDelete={toggleDeleteModal}
                    hideEdit={selectedAutoTrans?.length > 1}
                >
                    <div style={{paddingTop: '20px'}}>
                        <div className="body__side">
                            {selectedAutoTrans.length > 1 ? (
                                <div className="chips__container">
                                    {selectedAutoTrans.map((user) => (
                                        <Chip
                                            key={user?.tracker}
                                            label={user?.route_name}
                                            onDelete={() => removeItems(user)}
                                        />
                                    ))}
                                </div>
                            ) : selectedAutoTrans.length === 1 ? (
                                <div className="info__container">
                                    {Object.keys(selectedAutoTrans[0]).map(
                                        (item: keyof IAutoTransModel) => (
                                            <ListItem
                                                key={item}
                                                title={t(item)}
                                                value={
                                                    selectedAutoTrans[0][item]
                                                }
                                            />
                                        ),
                                    )}
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
                    handleDelete={onDelete}
                    loading={deleteAutoTrans.isLoading}
                >
                    <div className="body__side">
                        {selectedAutoTrans.map((item) => (
                            <Chip
                                key={item?.tracker}
                                label={item?.route_name}
                                onDelete={() => removeItems(item)}
                            />
                        ))}
                    </div>
                </DeleteDialog>
            )}

            <AddAndUpdateForms />
        </>
    );
};

export default RightSide;
