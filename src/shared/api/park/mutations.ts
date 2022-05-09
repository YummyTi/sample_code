import {useMutation} from 'react-query';

import {IAddParkModel} from '@src/shared/models/park_model';
import {useParkStore} from '@src/shared/store/park';

import {deletePark, getParkById, savePark, updatePark} from './index';

const useParkMutation = () => {
    const setParkData = useParkStore((state) => state.setParkData);
    const getSinglePark = useMutation(
        (id: string | number) => getParkById(id),
        {
            onSuccess: (data) => {
                console.log(data.data, 'data get single park');
                setParkData(data.data.data[0]);
            },
        },
    );

    const handleSavePark = useMutation(
        (data: IAddParkModel) => savePark(data),
        {
            onSuccess: (data) => {
                console.log(data.data, 'data added park');
            },
        },
    );

    const handleUpdatePark = useMutation(
        (data: IAddParkModel) => updatePark(data),
        {
            onSuccess: (data) => {
                console.log('Data updated: ', data);
            },
        },
    );

    const deleteParkList = useMutation(
        (id: string | number) => deletePark(id),
        {
            onSuccess: (data) => {
                console.log(data.data, 'data deleted park');
            },
        },
    );

    return {
        handleSavePark,
        handleUpdatePark,
        deleteParkList,
        getSinglePark,
    };
};

export default useParkMutation;
