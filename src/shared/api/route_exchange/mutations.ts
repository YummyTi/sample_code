import {useMutation} from 'react-query';
import shallow from 'zustand/shallow';

import {OrderSaveModel} from '@models/order_model';
import {useOrderStore} from '@store/order';

import {deleteOrder, saveOrder} from './index';

const useOrderMutation = () => {
    const {setRefetch, refetch} = useOrderStore(
        (state) => ({...state}),
        shallow,
    );

    const handleSave = useMutation((data: OrderSaveModel) => saveOrder(data), {
        onSuccess: (data) => {
            console.log(data.data, 'data');
            setRefetch(refetch + 1);
        },
    });

    const handleDelete = useMutation(
        (ex_id: number | null | undefined) => deleteOrder({ex_id}),
        {
            onSuccess: (data) => {
                console.log(data.data, 'data');
                setRefetch(refetch + 1);
            },
        },
    );

    return {
        handleSave,
        handleDelete,
    };
};

export default useOrderMutation;
