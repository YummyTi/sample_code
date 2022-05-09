import create, {SetState} from 'zustand';

import {RouteModel} from '@src/shared/models/route_model';

export interface IRoute {
    total: number;
    page: number;
    routes: RouteModel[];
    selectedRoutes: RouteModel[];
    text: string;
    openHistory: HTMLElement | null;
    openSide: boolean;
    setOpenSide: (openSide: boolean) => void;
    setOpenHistory: (openHistory: any) => void;
    setText: (text: string) => void;
    setSelectedRoutes: (selectedRoutes: RouteModel[]) => void;
    setRoutes: (routes: RouteModel[]) => void;
    setPage: (page: number) => void;
    setTotal: (total: number) => void;
}

export const useRouteStore = create<IRoute>((set: SetState<IRoute>) => ({
    total: 0,
    page: 1,
    routes: [],
    selectedRoutes: [],
    text: '',
    openHistory: null,
    openSide: false,
    setOpenSide: (openSide: boolean) => set((state) => ({...state, openSide})),
    setOpenHistory: (openHistory) => set({openHistory}),
    setText: (text: string) => set((state) => ({...state, text})),
    setSelectedRoutes: (selectedRoutes: RouteModel[]) =>
        set((state) => ({...state, selectedRoutes})),
    setRoutes: (routes: RouteModel[]) => set((state) => ({...state, routes})),
    setPage: (page: number) => set((state) => ({...state, page})),
    setTotal: (total) => set((state) => ({...state, total})),
}));
