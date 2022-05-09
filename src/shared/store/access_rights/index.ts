import produce from 'immer';
import create, {GetState, SetState} from 'zustand';

import {UserModel} from '@src/shared/models/users_model';

interface IAccess {
    usersList: UserModel[];
    status: string;
    totalCountUser: number;
    page: number;
    searchTerm: string;
    refetchCount: number;
    selectedUsers: UserModel[];
    permitM: boolean;
    setPermitM: (payload: boolean) => void;
    setSelectedUsers: (users: UserModel[]) => void;
    setRefetchCount: () => void;
    setSearchTerm: (searchTerm: string) => void;
    setPage: (payload: number) => void;
    setTotalCountUsers: (payload?: number) => void;
    setStatus: (payload: string) => void;
    setUsersList: (payload: UserModel[]) => void;
}

export const useAccessStore = create<IAccess>(
    (set: SetState<IAccess>, get: GetState<IAccess>) => ({
        refetchCount: 0,
        page: 1,
        totalCountUser: 0,
        usersList: [],
        status: '',
        searchTerm: '',
        selectedUsers: [],
        permitM: false,
        setPermitM: (payload) => {
            set({permitM: payload});
        },
        setSelectedUsers: (users) => {
            set(() => ({
                selectedUsers: users,
            }));
        },
        setRefetchCount: () => {
            set(({refetchCount}) => ({refetchCount: refetchCount + 1}));
        },
        setSearchTerm: (searchTerm: string) => {
            set(() => ({searchTerm}));
        },
        setPage: (payload: number) => {
            set(produce(() => ({page: payload})));
        },
        setTotalCountUsers: (payload?: number) => {
            set(produce(() => ({totalCountUser: payload})));
        },
        setStatus: (payload): void => {
            set({status: payload});
        },
        setUsersList: (payload): void => {
            set({usersList: payload});
        },
    }),
);
