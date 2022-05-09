import produce from 'immer';
import create, {GetState, SetState} from 'zustand';

import {IAutoTransModel} from '@src/shared/models/autotrans_model';
import {IFilter} from '@src/shared/models/filter_model';

import {filters} from './data';

interface Selected extends IAutoTransModel {
    col1: number;
}

interface IAutoTrans {
    autoTrans: IAutoTransModel[];
    selectedAutoTrans: Selected[];
    totalCountTrans: number;
    page: number;
    searchTerm: string;
    refetchCount: number;
    filters: IFilter[];
    setFilters: (checked: boolean, payload: IFilter) => void;
    setPage: (payload: number) => void;
    setAutoTrans: (payload: IAutoTransModel[]) => void;
    setSelectedAutoTrans: (payload: Selected[]) => void;
    setRefetchCount: () => void;
    setSearchTerm: (searchTerm: string) => void;
    setTotalCountTrans: (payload?: number) => void;
}

export const useAutoTransStore = create<IAutoTrans>(
    (set: SetState<IAutoTrans>, get: GetState<IAutoTrans>) => ({
        autoTrans: [],
        selectedAutoTrans: [],
        page: 1,
        searchTerm: '',
        refetchCount: 0,
        totalCountTrans: 0,
        filters: filters,
        setFilters: (checked, payload) => {
            set(
                produce((draft) => {
                    const todo = draft.filters.find(
                        (todo: IFilter) => todo.type === payload.type,
                    );
                    //@ts-ignore
                    todo.isChecked = checked;
                }),
            );
        },
        setPage: (page) => set(() => ({page})),
        setSelectedAutoTrans: (selectedAutoTrans) =>
            set(() => ({selectedAutoTrans})),
        setAutoTrans: (autoTrans) => set(produce(() => ({autoTrans}))),
        setSearchTerm: (searchTerm) => set(() => ({searchTerm})),
        setRefetchCount: () =>
            set(({refetchCount}) => ({refetchCount: refetchCount + 1})),
        setTotalCountTrans: (totalCountTrans) =>
            set(produce(() => ({totalCountTrans}))),
    }),
);
