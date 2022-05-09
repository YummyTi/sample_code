import Chip from '@mui/material/Chip';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import RightSideWrapper from '@src/shared/components/RightSideWrapper';

import useHandleRoute from '@api/route/mutations';
import {SideBar} from '@components/SideBar';
import DeleteDialog from '@components/SureToDeleteDialog';
import {RouteModel} from '@models/route_model';
import {useMainStore} from '@store/main';
import {useRouteStore} from '@store/route';

import IconBus from '@images/svgs/IconBus';

const RightSide = () => {
    const [open, setOpen] = useState(false);
    const {handleDeleteRoute} = useHandleRoute();

    const {t} = useTranslation();
    const {selectedRoutes, setSelectedRoutes} = useRouteStore(
        (state) => state,
        shallow,
    );
    const {setOpenSide, openSide} = useMainStore((state) => state, shallow);

    const handleClose = () => {
        setSelectedRoutes([]);
    };

    useEffect(() => {
        if (handleDeleteRoute.isSuccess) {
            setOpen(false);
            setOpenSide(false);
            setSelectedRoutes([]);
        }
    }, [handleDeleteRoute.isSuccess]);

    useEffect(() => {
        if (!selectedRoutes.length) {
            setOpenSide(false);
        }
    }, [selectedRoutes.length]);

    const handleDelete = (route: RouteModel) => {
        setSelectedRoutes(
            selectedRoutes.filter((item) => item.route_id !== route.route_id),
        );
    };

    const onDelete = () => {
        for (let i = 0; i < selectedRoutes.length; i++) {
            handleDeleteRoute.mutate(selectedRoutes[i].route_id);
        }
    };

    const toggleDeleteModal = () => setOpen(!open);

    return (
        <>
            <SideBar
                maxWidth="450px"
                onOutSideClick={() => null}
                isOpen={openSide && selectedRoutes?.length > 0}
            >
                <RightSideWrapper
                    title={t('chosen_autoparks')}
                    handleClose={handleClose}
                    onDelete={toggleDeleteModal}
                    hideEdit
                >
                    <div style={{paddingTop: '16px'}}>
                        <div className="body__side">
                            {selectedRoutes.length > 0 ? (
                                <div className="right__card">
                                    <div className="chip__content">
                                        {selectedRoutes.map((route, index) => (
                                            <Chip
                                                key={index}
                                                icon={
                                                    <IconBus className="bus__icon" />
                                                }
                                                label={route.route_name}
                                                variant="outlined"
                                                onDelete={() =>
                                                    handleDelete(route)
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </RightSideWrapper>
            </SideBar>

            {open && (
                <DeleteDialog
                    open={open}
                    close={toggleDeleteModal}
                    handleDelete={onDelete}
                    loading={handleDeleteRoute.isLoading}
                >
                    <div className="body__side">
                        {selectedRoutes.map((user, index: number) => (
                            <Chip
                                key={index}
                                label={user.route_name}
                                onDelete={() => handleDelete(user)}
                            />
                        ))}
                    </div>
                </DeleteDialog>
            )}
        </>
    );
};

export default RightSide;
