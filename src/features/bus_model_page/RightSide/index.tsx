import Chip from '@mui/material/Chip';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import RightSideWrapper from '@src/shared/components/RightSideWrapper';

import useBusModelMutate from '@api/bus_model/mutations';
import {SideBar} from '@components/SideBar';
import DeleteDialog from '@components/SureToDeleteDialog';
import {useBusModelStore} from '@store/bus_model';
import {useMainStore} from '@store/main';

import BusModelUpdate from '../BusModelUpdate';
import ListItem from './ListItem';

const RightSide = () => {
    const [openModal, setOpenModal] = useState(false);

    const {t} = useTranslation();
    const {deleteBusModelFunc} = useBusModelMutate();
    const {setOpenSide, openSide, handleOpenUpdate, openUpdate} = useMainStore(
        (state) => state,
        shallow,
    );
    const {selectedBusModel, setSelectedBusModel} = useBusModelStore(
        (state) => state,
        shallow,
    );

    const handleClose = () => {
        setSelectedBusModel([]);
        setOpenSide(false);
    };

    const handleDelete = (busModel: typeof selectedBusModel[0]) => {
        if (selectedBusModel.length === 1) {
            setOpenModal(false);
        }
        const filteredModels = selectedBusModel.filter(
            (item) => item?.col1 !== busModel?.col1,
        );
        setSelectedBusModel(filteredModels);
        setOpenSide(true);
    };

    useEffect(() => {
        if (deleteBusModelFunc.isSuccess) {
            setOpenModal(false);
        }
    }, [deleteBusModelFunc.isSuccess]);

    const handleActive = (active: boolean | string) => {
        if (active) {
            return t('active');
        } else {
            return t('inactive');
        }
    };

    const deleteBusModels = () => {
        const deleteIds = selectedBusModel.map((busModel) => busModel?.id);
        deleteBusModelFunc.mutate(deleteIds);
    };

    const toggleDeleteModal = () => {
        setOpenModal(!openModal);
    };

    return (
        <>
            <SideBar
                maxWidth="450px"
                onOutSideClick={() => null}
                isOpen={openSide && selectedBusModel?.length > 0}
            >
                <RightSideWrapper
                    title={t('chosen_models')}
                    onEdit={() => handleOpenUpdate(true)}
                    handleClose={handleClose}
                    onDelete={toggleDeleteModal}
                    hideEdit={selectedBusModel?.length > 1}
                >
                    <div style={{paddingTop: '16px'}}>
                        <div className="body__side">
                            {selectedBusModel.length > 1 ? (
                                <div className="chips__container">
                                    {selectedBusModel.map((busModel) => (
                                        <Chip
                                            key={busModel?.col1}
                                            label={busModel?.name}
                                            onDelete={() =>
                                                handleDelete(busModel)
                                            }
                                        />
                                    ))}
                                </div>
                            ) : selectedBusModel.length === 1 ? (
                                <div className="info__container">
                                    <ListItem
                                        title="ID"
                                        value={selectedBusModel[0]?.id}
                                    />
                                    <ListItem
                                        title={t('name')}
                                        value={selectedBusModel[0]?.name}
                                    />
                                    <ListItem
                                        title={t('remark')}
                                        value={handleActive(
                                            selectedBusModel[0]?.remark,
                                        )}
                                    />
                                    <ListItem
                                        title={t('last_user')}
                                        value={selectedBusModel[0]?.lastUser}
                                    />
                                    <ListItem
                                        title={t('last_changed')}
                                        value={selectedBusModel[0]?.lastChanged}
                                    />
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
                    handleDelete={deleteBusModels}
                    loading={deleteBusModelFunc.isLoading}
                >
                    <div className="body__side">
                        {selectedBusModel.map((busModel) => (
                            <Chip
                                key={busModel?.col1}
                                label={busModel?.name}
                                onDelete={() => handleDelete(busModel)}
                            />
                        ))}
                    </div>
                </DeleteDialog>
            )}

            {openUpdate && <BusModelUpdate />}
        </>
    );
};

export default React.memo(RightSide);
