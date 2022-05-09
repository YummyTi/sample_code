import {useMutation} from 'react-query';
import shallow from 'zustand/shallow';

import {ISaveBusModel, IUpdateBusModel} from '@models/bus_model';
import {useAccessStore} from '@store/access_rights';
import {useBusModelStore} from '@store/bus_model';
import {useMainStore} from '@store/main';

import {deleteBusModel, deleteFuel, saveBusModel, saveFuel} from './index';

const useBusModelMutate = () => {
    const setOpenSide = useMainStore((state) => state.setOpenSide);
    const setRefetch = useAccessStore((state) => state.setRefetchCount);
    const {setRefetch: setRef} = useBusModelStore((state) => state, shallow);

    const handleSaveBusModel = useMutation(
        (data: IUpdateBusModel) => saveBusModel(data),
        {
            onSuccess: (data) => {
                console.log(data.data, 'data bus model');
                setRefetch();
                setRef();
            },
        },
    );

    const deleteBusModelFunc = useMutation(
        (id: number[] | string[]) => deleteBusModel(id),
        {
            onSuccess: (data) => {
                console.log(data, 'deleted successfully');
                setOpenSide(false);
                setRefetch();
            },
        },
    );

    const deleteFuelType = useMutation(
        (id: number[] | string[]) => deleteFuel(id),
        {
            onSuccess: (data) => {
                console.log(data, 'deleted successfully');
                setOpenSide(false);
                setRefetch();
            },
        },
    );

    //fuel requests
    const handleSaveFuelType = useMutation(
        (data: ISaveBusModel) => saveFuel(data),
        {
            onSuccess: (data) => {
                console.log(data.data, 'data fuel');
            },
        },
    );

    return {
        handleSaveBusModel,
        handleSaveFuelType,
        deleteBusModelFunc,
        deleteFuelType,
    };
};

export default useBusModelMutate;
