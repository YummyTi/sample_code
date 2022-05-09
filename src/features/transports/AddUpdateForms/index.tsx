import React from 'react';
import shallow from 'zustand/shallow';

import {useAutoTransMutate} from '@src/shared/api/autotransport/mutations';
import {useAutoTransStore} from '@src/shared/store/autotransport';
import {useMainStore} from '@src/shared/store/main';

import FormField from '../FormField';

const AddAndUpdateForms = () => {
    const store = useAutoTransStore((state) => state, shallow);
    const addModal = useMainStore(
        (state) => ({
            handleModal: state.handleTap,
            open: state.open,
        }),
        shallow,
    );
    const updateModal = useMainStore(
        (state) => ({
            handleModal: state.handleOpenUpdate,
            open: state.openUpdate,
        }),
        shallow,
    );
    const {saveAutoTrans, updateAutoTrans} = useAutoTransMutate();

    return (
        <>
            {addModal.open && (
                <FormField
                    store={store}
                    modal={addModal}
                    mutate={saveAutoTrans}
                />
            )}

            {updateModal.open && (
                <FormField
                    store={store}
                    modal={updateModal}
                    mutate={updateAutoTrans}
                />
            )}
        </>
    );
};

export default AddAndUpdateForms;
