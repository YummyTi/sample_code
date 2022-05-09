import create, {GetState, SetState} from 'zustand';

import {IBusModelJSON} from '@src/shared/models/bus_model';
import {IFuelType} from '@src/shared/models/fuel_type_model';

interface Selected extends IBusModelJSON {
    col1: number;
}

interface IBusModel {
    busModels: IBusModelJSON[];
    totalBusModelCount: number;
    refetch: number;
    setRefetch: () => void;
    setTotalBusModelCount: (payload: number) => void;
    setBusModelsList: (payload: IBusModelJSON[]) => void;
    selectedBusModel: Selected[];
    setSelectedBusModel: (payload: Selected[]) => void;
    page: number;
    setPage: (payload: number) => void;
    term: string;
    setSearchTerm: (payload: string) => void;
    fuelTypeList: IFuelType[];
    setFuelTypeList: (payload: IFuelType[]) => void;
    selectedFuelType: IFuelType[];
    setSelectedFuelType: (payload: IFuelType[]) => void;
}

export const useBusModelStore = create<IBusModel>(
    (set: SetState<IBusModel>, get: GetState<IBusModel>) => ({
        busModels: [],
        totalBusModelCount: 0,
        page: 1,
        term: '',
        fuelTypeList: [],
        selectedFuelType: [],
        selectedBusModel: [],
        refetch: 1,
        setRefetch: () => {
            set((state) => ({refetch: state.refetch + 1}));
        },
        setTotalBusModelCount: (payload: number) => {
            set({totalBusModelCount: payload});
        },
        setSelectedBusModel: (payload) => {
            set({selectedBusModel: payload});
        },
        setSelectedFuelType: (payload: IFuelType[]) => {
            set({selectedFuelType: payload});
        },
        setFuelTypeList: (payload: IFuelType[]) => {
            set({fuelTypeList: payload});
        },
        setSearchTerm: (payload: string) => {
            set({term: payload});
        },
        setPage: (payload: number) => {
            set({page: payload});
        },
        setBusModelsList: (payload): void => {
            set({busModels: payload});
        },
    }),
);
