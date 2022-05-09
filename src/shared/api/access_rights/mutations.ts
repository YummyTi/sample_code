import {useMutation} from 'react-query';

import {IUser, IUserUpdate} from '@src/shared/models/users_model';
import {useAccessStore} from '@src/shared/store/access_rights';
import {useMainStore} from '@src/shared/store/main';

import {deletUser, saveUser, updateUser} from './index';

const useAccessMutate = () => {
    const setOpenSide = useMainStore((state) => state.setOpenSide);
    const setRefetch = useAccessStore((state) => state.setRefetchCount);

    const saveNewUser = useMutation((data: IUser) => saveUser(data), {
        onSuccess: (data) => {
            console.log(data.data, 'data added user');
        },
        onError: (err: any) => {
            // console.log(err.response.data, 'err');
        },
    });

    const updateUserFunc = useMutation(
        (data: IUserUpdate) => updateUser(data),
        {
            onSuccess: (data) => {
                console.log(data.data, 'data updated user');
            },
            onError: (err: any) => {
                // console.log(err.response.data, 'err');
            },
        },
    );

    const deleteUserList = useMutation((id: number[]) => deletUser(id), {
        onSuccess: (data) => {
            console.log(data.data, 'deleted successfully');
            setOpenSide(false);
            setRefetch();
        },
    });

    return {saveNewUser, deleteUserList, updateUserFunc};
};

export default useAccessMutate;
