import {Chip} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import useParkMutation from '@api/park/mutations';
import DeleteDialog from '@components/SureToDeleteDialog';
import RightSideWrapper from '@shared/components/RightSideWrapper';
import {SideBar} from '@shared/components/SideBar';
import {useMainStore} from '@store/main';
import {useParkStore} from '@store/park';

import {UpdateAutomobile} from '../UpdateAutomobile';
import CardItem from './CardItem';

const RightSide = () => {
    const [openModal, setOpenModal] = useState(false);

    const {t} = useTranslation();
    const {handleOpenUpdate, openSide, setOpenSide, openUpdate} = useMainStore(
        (state) => state,
        shallow,
    );
    const {selectedPark, setSelectedPark} = useParkStore(
        (state) => state,
        shallow,
    );
    const {deleteParkList} = useParkMutation();

    useEffect(() => {
        if (deleteParkList.isSuccess) {
            setOpenModal(false);
        }
    }, [deleteParkList.isSuccess]);

    const handleClose = () => {
        setSelectedPark([]);
        setOpenSide(false);
    };

    const removeItems = (user: any) => {
        if (selectedPark.length === 1) {
            setOpenModal(false);
        }
        const filteredUsers = selectedPark.filter(
            (item: any) => item.col1 !== user.col1,
        );
        setSelectedPark(filteredUsers);
        setOpenSide(true);
    };

    const deleteParks = () => {
        selectedPark.forEach((park: any) => {
            deleteParkList.mutate(park.park_id);
        });
    };

    const toggleDeleteModal = () => setOpenModal(!openModal);

    return (
        <>
            <SideBar
                maxWidth="450px"
                onOutSideClick={() => null}
                isOpen={openSide && selectedPark?.length > 0}
            >
                <RightSideWrapper
                    title={t('chosen_autoparks')}
                    onEdit={() => handleOpenUpdate(true)}
                    handleClose={handleClose}
                    onDelete={toggleDeleteModal}
                    hideEdit={selectedPark?.length > 1}
                >
                    <div style={{paddingTop: '16px'}}>
                        <div className="body__side">
                            {selectedPark.length > 1 ? (
                                <div className="chips__container">
                                    {selectedPark.map((park) => (
                                        <Chip
                                            key={park?.col1}
                                            label={park?.park}
                                            onDelete={() => removeItems(park)}
                                        />
                                    ))}
                                </div>
                            ) : selectedPark.length === 1 ? (
                                <div className="info__container">
                                    <div className="info__container">
                                        <CardItem />
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
                    handleDelete={deleteParks}
                    loading={deleteParkList.isLoading}
                >
                    <div className="body__side">
                        {selectedPark.map((park) => (
                            <Chip
                                key={park?.col1}
                                label={park?.park}
                                onDelete={() => removeItems(park)}
                            />
                        ))}
                    </div>
                </DeleteDialog>
            )}

            {openUpdate && <UpdateAutomobile />}
        </>
    );
};

export default RightSide;
