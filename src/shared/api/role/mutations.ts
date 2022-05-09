import {useMutation} from 'react-query';
import shallow from 'zustand/shallow';

import {SavePermission} from '@models/permission_model';
import {IRoleModelState} from '@models/role_model';
import {useRoleStore} from '@store/role';

import {deleteRole, savePermissionRole, saveRole} from './index';

const useRoleMutate = () => {
    const {setRefetch, refetch, setPermitM} = useRoleStore(
        (state) => ({...state}),
        shallow,
    );

    const handleDelete = useMutation(
        (id: string[] | number[]) => deleteRole(id),
        {
            onSuccess: (data) => {
                console.log(data);
            },
        },
    );

    const handleSaveRole = useMutation(
        (data: IRoleModelState) => saveRole(data),
        {
            onSuccess: (data) => {
                console.log(data);
                setRefetch(refetch + 1);
            },
        },
    );

    const handleSavePermissionRole = useMutation(
        (data: SavePermission) => savePermissionRole(data),
        {
            onSuccess: (data) => {
                console.log(data.data, 'data saved');
                setPermitM(false);
            },
        },
    );

    return {
        handleDelete,
        handleSaveRole,
        handleSavePermissionRole,
    };
};

export default useRoleMutate;
