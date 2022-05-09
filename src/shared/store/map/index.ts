import produce from 'immer';
import create, {GetState, SetState} from 'zustand';

import {IBusStops} from '@src/shared/models/bus_stop_model';

interface IMap {
    time: number;
    buses: IBusStops[];
    setBuses: (payload: IBusStops) => void;
    countDown: () => void;
}

export const useMapStore = create<IMap>(
    (set: SetState<IMap>, get: GetState<IMap>) => ({
        time: 60,
        buses: [],
        countDown: (): void => {
            set((state) => ({
                time: state.time - 1,
            }));
        },
        setBuses: (payload): void => {
            set(produce(() => ({buses: payload})));
        },
    }),
);
