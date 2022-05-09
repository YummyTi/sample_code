import create, {GetState, SetState} from 'zustand';

import {IBusSchedule, origData} from './data';

interface IExample {
    origData: IBusSchedule[];
    setOrigData: (payload: IBusSchedule) => void;
}

export const useExampleStore = create<IExample>(
    (set: SetState<IExample>, get: GetState<IExample>) => ({
        origData: origData,
        setOrigData: (payload): void => {
            set((state) => {
                return {
                    origData: [
                        ...state.origData,
                        {id: payload.id, days: payload.days},
                    ],
                };
            });
        },
    }),
);
