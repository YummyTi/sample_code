import produce from 'immer';
import create, {SetState} from 'zustand';

import {IPermissionModel, permissionObj} from './mock';

interface IPermission {
    state: IPermissionModel | any;
    setState: (payload: IPermissionModel | any) => void;
    updateState: (payload: any, index: number | string | null) => void;
}

export const usePermissionStore = create<IPermission>(
    (set: SetState<IPermission>) => ({
        state: permissionObj,
        setState: (payload) => set((state) => ({...state, state: payload})),
        updateState: (payload, index) =>
            set(
                produce((draft) => {
                    if (typeof index === 'number') {
                        draft.state[payload] = [index];
                    } else {
                        draft.state[payload] = [];
                    }
                }),
            ),
    }),
);
