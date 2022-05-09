import {Chip} from '@mui/material';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import RightSideWrapper from '@src/shared/components/RightSideWrapper';

import useBusModelMutate from '@api/bus_model/mutations';
import {SideBar} from '@components/SideBar';
import DeleteDialog from '@components/SureToDeleteDialog';
import ListItem from '@features/bus_model_page/RightSide/ListItem';
import {useBusModelStore} from '@store/bus_model';
import {useMainStore} from '@store/main';

import UpdateFuelType from '../UpdateFuelType';

const FuelRightSide = () => {
    const [openModal, setOpenModal] = useState(false);

    const {t} = useTranslation();
    const {setOpenSide, openSide, handleOpenUpdate, openUpdate} = useMainStore(
        (state) => state,
        shallow,
    );
    const {deleteFuelType} = useBusModelMutate();
    const {selectedFuelType, setSelectedFuelType} = useBusModelStore(
        (state) => state,
        shallow,
    );

    useEffect(() => {
        if (deleteFuelType.isSuccess) {
            setOpenModal(false);
        }
    }, [deleteFuelType.isSuccess]);

    const handleClose = () => {
        setOpenSide(false);
        setSelectedFuelType([]);
    };

    const handleDelete = (busModel: any) => {
        if (selectedFuelType.length === 1) {
            setOpenModal(false);
        }
        const filteredModels = selectedFuelType.filter(
            (item: any) => item?.col1 !== busModel?.col1,
        );
        setSelectedFuelType(filteredModels);
        setOpenSide(true);
    };

    const deleteBusModels = () => {
        const deleteIds = selectedFuelType.map((busModel) => busModel?.id);
        deleteFuelType.mutate(deleteIds);
        setSelectedFuelType([]);
    };

    const toggleDeleteModal = () => setOpenModal(!openModal);

    return (
        <>
            <SideBar
                maxWidth="450px"
                onOutSideClick={() => null}
                isOpen={openSide && selectedFuelType?.length > 0}
            >
                <RightSideWrapper
                    title={t('chosen_autoparks')}
                    onEdit={() => handleOpenUpdate(true)}
                    handleClose={handleClose}
                    onDelete={toggleDeleteModal}
                    hideEdit={selectedFuelType?.length > 1}
                >
                    <div style={{paddingTop: '16px'}}>
                        <div className="body__side">
                            {selectedFuelType.length > 1 ? (
                                <div className="chips__container">
                                    {selectedFuelType.map((busModel) => (
                                        <Chip
                                            key={busModel?.id}
                                            label={busModel?.name}
                                            onDelete={() =>
                                                handleDelete(busModel)
                                            }
                                        />
                                    ))}
                                </div>
                            ) : selectedFuelType.length === 1 ? (
                                <div className="info__container">
                                    <ListItem
                                        title="ID"
                                        value={selectedFuelType[0]?.id}
                                    />
                                    <ListItem
                                        title="Имя"
                                        value={selectedFuelType[0]?.name}
                                    />
                                    <ListItem
                                        title="Описание"
                                        value={selectedFuelType[0]?.remark}
                                    />
                                    <ListItem
                                        title="Последний пользователь"
                                        value={selectedFuelType[0]?.lastUser}
                                    />
                                    <ListItem
                                        title="Последний раз изменён"
                                        value={dayjs(
                                            selectedFuelType[0]?.lastChanged,
                                        ).format('YYYY-MM-DD')}
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
                    loading={deleteFuelType.isLoading}
                >
                    <div className="body__side">
                        {selectedFuelType.map((busModel) => (
                            <Chip
                                key={busModel?.id}
                                label={busModel?.name}
                                onDelete={() => handleDelete(busModel)}
                            />
                        ))}
                    </div>
                </DeleteDialog>
            )}

            {openUpdate && <UpdateFuelType />}
        </>
    );
};

export default FuelRightSide;
