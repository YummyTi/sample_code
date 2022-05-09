import create, {GetState, SetState} from 'zustand';

import {mockData} from './mockData';

interface IEtalon {
    data: any;
    setData: (payload: any) => void;
}

export const useEtalonStore = create<IEtalon>(
    (set: SetState<IEtalon>, get: GetState<IEtalon>) => ({
        data: mockData,
        setData: (payload): void => {
            set({data: payload});
        },
    }),
);
