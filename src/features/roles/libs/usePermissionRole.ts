import {useEffect} from 'react';
import shallow from 'zustand/shallow';

import {usePermissionStore} from '@store/permission';
import {useRoleStore} from '@store/role';

const usePermissionRole = () => {
    const {selectedRoles, roles} = useRoleStore(
        (state) => ({...state}),
        shallow,
    );
    const {setState, updateState} = usePermissionStore(
        (state) => ({...state}),
        shallow,
    );

    useEffect(() => {
        if (selectedRoles?.length === 1) {
            console.log(roles, 'roles CHANGE');
            selectedRoles[0].permissions.forEach((permit) => {
                updateState(permit.url, permit.permission);
                // setState({
                //     automobile: [1],
                //     transports: [1],
                //     vehicle_model: [1],
                //     routes: [1],
                //     checkpoints: [1],
                //     polygons: [1],
                //     order: [1],
                //     races_fuel: [1],
                //     main: [1],
                //     statistic: [1],
                //     logs: [1],
                // })
            });
        }
    }, [selectedRoles?.length]);

    return {};
};

export default usePermissionRole;
