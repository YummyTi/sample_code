import produce from 'immer';
import create, {SetState} from 'zustand';

import {RoleModel} from '@models/role_model';

export interface IRole {
    roles: RoleModel[];
    setRoles: (roles: RoleModel[]) => void;
    selectedRoles: RoleModel[];
    setSelectedRoles: (users: RoleModel[]) => void;
    page: number;
    setPage: (page: number) => void;
    refetch: number;
    setRefetch: (refetch: number) => void;
    permitM: boolean;
    setPermitM: (payload: boolean) => void;
}

export const useRoleStore = create<IRole>((set: SetState<IRole>) => ({
    roles: [],
    selectedRoles: [],
    page: 1,
    refetch: 0,
    permitM: false,
    setPermitM: (payload) => {
        set({permitM: payload});
    },
    setRefetch: (refetch: number) => set((state) => ({refetch})),
    setPage: (page: number) => set((state) => ({...state, page})),
    setSelectedRoles: (roles: any[]) =>
        set((state) => ({...state, selectedRoles: roles})),
    setRoles: (roles: any[]) =>
        set(
            produce(() => ({
                roles: roles,
            })),
        ),
}));
