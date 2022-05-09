import {useMutation} from 'react-query';

import {useAutoTransStore} from '@src/shared/store/autotransport';
import {useMainStore} from '@src/shared/store/main';

import {deleteAutoTransport, saveAutoTransport, updateAutoTransport} from '.';

export const useAutoTransMutate = () => {
    const setOpenSide = useMainStore((state) => state.setOpenSide);
    const setRefetch = useAutoTransStore((state) => state.setRefetchCount);

    const saveAutoTrans = useMutation((data) => saveAutoTransport(data), {
        onSuccess: (data) => {
            console.log(data.data, 'data added auto transport');
        },
        onError: (err: any) => {
            console.log(err, 'err');
        },
    });

    const updateAutoTrans = useMutation(
        (data: any) => updateAutoTransport(data),
        {
            onSuccess: (data) => {
                console.log(data.data, 'data added auto transport');
            },
            onError: (err: any) => {
                console.log(err.response.data, 'err');
            },
        },
    );

    const deleteAutoTrans = useMutation(
        (id: number) => deleteAutoTransport(id),
        {
            onSuccess: (data) => {
                console.log(data.data, 'deleted successfully');
                setOpenSide(false);
                setRefetch();
            },
        },
    );

    return {saveAutoTrans, updateAutoTrans, deleteAutoTrans};
};
