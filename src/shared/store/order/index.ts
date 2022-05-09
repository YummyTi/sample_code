import create, {SetState} from 'zustand';

import {IGraphic} from '@models/graph_model';
import {
    RouteExchangeModel,
    RouteExchangeOrder,
} from '@models/route_exchange_model';

interface IOrder {
    expanded: string | false;
    routeId: number;
    fetchCount: number;
    orders: RouteExchangeModel[];
    selectedOrder: RouteExchangeModel | null;
    openM: boolean;
    openS: boolean;
    date: Date | undefined;
    orderGarages: RouteExchangeOrder[];
    refetch: number;
    graphId: number | string;
    graphic: IGraphic[];
    setGraphic: (payload: IGraphic[]) => void;
    setGraphId: (payload: number | string) => void;
    setRefetch: (payload: number) => void;
    setOrderGarages: (payload: RouteExchangeOrder[]) => void;
    setDate: (payload: Date) => void;
    setOpenS: (payload: boolean) => void;
    closeModal: () => void;
    setOpenM: (payload: boolean) => void;
    setOrder: (payload: RouteExchangeModel) => void;
    setOrders: (payload: RouteExchangeModel[]) => void;
    setFetchUp: (payload: number) => void;
    setRouteId: (payload: number) => void;
    setExpanded: (payload: string | false) => void;
}

export const useOrderStore = create<IOrder>((set: SetState<IOrder>) => ({
    expanded: false,
    routeId: 578,
    fetchCount: 0,
    orders: [],
    selectedOrder: null,
    openM: false,
    openS: false,
    date: undefined,
    orderGarages: [],
    refetch: 0,
    graphId: 0,
    graphic: [],
    setGraphic: (payload) => {
        set({graphic: payload});
    },
    setGraphId: (payload: number | string) => {
        set({graphId: payload});
    },
    setRefetch: (payload: number) => {
        set((state) => ({...state, refetch: payload}));
    },
    setOrderGarages: (payload) => {
        set({orderGarages: payload});
    },
    setDate: (payload) => set((state) => ({...state, date: payload})),
    setOpenS: (payload) => set({openS: payload}),
    setOpenM: (payload) => set({openM: payload}),
    closeModal: () => set({openM: false}),
    setOrder: (payload) => {
        set({selectedOrder: payload});
    },
    setOrders: (payload) => set({orders: payload}),
    setFetchUp: (payload) => set((state) => ({...state, fetchCount: payload})),
    setRouteId: (payload: number) =>
        set((state) => ({...state, routeId: payload})),
    setExpanded: (payload) => {
        set(() => ({expanded: payload}));
    },
}));
