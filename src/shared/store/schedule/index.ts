import create, {SetState} from 'zustand';

import {IBusSchedule, INewData} from './fakeData';

export interface ISchedule {
    origData: IBusSchedule[];
    newData: any[];
    openM: boolean;
    step: number;
    id: number;
    stepData: any;
    shPage: number;
    shTotalCount: number;
    stepSave: number;
    update: boolean;
    setUpdate: (update: boolean) => void;
    setStepSave: (payload: number) => void;
    setShTotalCount: (shTotalCount: number) => void;
    setShPage: (page: number) => void;
    clearStep: () => void;
    setStepData: (data: any) => void;
    updateStepData: (data: any) => void;
    setId: (id: number) => void;
    setStep: (step: number) => void;
    setOpenM: (openM: boolean) => void;
    setOrigData: (payload: IBusSchedule) => void;
    setNewData: (payload: any[]) => void;
    setUpdStep: (data: any) => void;
}

export const useScheduleStore = create<ISchedule>(
    (set: SetState<ISchedule>) => ({
        origData: [],
        newData: [],
        openM: false,
        step: 0,
        id: 1,
        stepData: [],
        shPage: 1,
        shTotalCount: 0,
        stepSave: 0,
        update: false,
        updateStepData: (data: any) => {
            set((state) => ({...state, stepData: data}));
        },
        setUpdate: (update: boolean) => set((state) => ({...state, update})),
        setUpdStep: (data) => {
            set(() => ({stepData: data}));
        },
        setStepSave: (payload: number) => set({stepSave: payload}),
        setShTotalCount: (shTotalCount: number) =>
            set((state) => ({...state, shTotalCount})),
        setShPage: (page: number) => set((state) => ({shPage: page})),
        setStepData: (payload) =>
            set((state) => ({
                ...state,
                stepData: [...state.stepData, payload],
            })),

        clearStep: () => set((state) => ({...state, stepData: []})),
        setId: (id: number) => set({id}),
        setStep: (step: number) => set({step}),
        setOpenM: (openM: boolean) => set({openM}),
        setNewData: (payload): void => {
            set((state) => ({newData: payload}));
        },
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
