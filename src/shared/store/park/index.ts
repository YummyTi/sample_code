import produce from 'immer';
import {string} from 'yup/lib/locale';
import create, {SetState} from 'zustand';

import {IGarageModel, IParkModel, ISingleparkModel} from '@models/park_model';

interface IPark {
    parks: IParkModel[];

    selectedPark: any[];
    parkTotalCount: number;
    page: number;
    term: string;
    coords: any[];
    parkData: Partial<ISingleparkModel>;
    garagePark: IGarageModel[];
    setGaragePark: (payload: IGarageModel[]) => void;
    setParkData: (payload: ISingleparkModel) => void;
    setCoords: (coords: any[]) => void;
    setTerm: (term: string) => void;
    setPage: (payload: number) => void;
    setParkTotal: (payload: number) => void;
    setSearchParks: (payload: any) => void;
    setParks: (payload: IParkModel[]) => void;
    setSelectedPark: (payload: any[]) => void;
}

export const useParkStore = create<IPark>((set: SetState<IPark>) => ({
    parks: [],
    selectedPark: [],
    parkTotalCount: 0,
    page: 1,
    term: '',
    coords: [],
    searchTerm: string,
    parkData: {},
    garagePark: [],
    setGaragePark: (payload) => {
        set({garagePark: payload});
    },
    setParkData: (payload) => {
        set(() => ({parkData: payload}));
    },
    setCoords: (coords: any[]) => set((state) => ({...state, coords})),
    setPage: (payload: number) => {
        set(() => ({page: payload}));
    },
    setParkTotal: (payload: number) => {
        set(() => ({parkTotalCount: payload}));
    },
    setSearchParks: (payload: any) => {
        set(() => ({parks: payload}));
    },
    setTerm: (payload: string) => {
        set(() => ({term: payload}));
    },
    setSelectedPark: (payload: any[]) => {
        set(() => ({selectedPark: payload}));
    },
    setParks: (payload): void => {
        set(produce(() => ({parks: payload})));
    },
}));
