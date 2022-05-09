import produce from 'immer';
import create, {SetState} from 'zustand';

import {CoefModel, DiffNormData, DiffNormItem} from '@models/diff_norm_models';

interface IDiffNorm {
    park_id: number;
    routeData: DiffNormData;
    coefList: CoefModel[];
    isRouteOpen: boolean;
    isModelOpen: boolean;
    isCoefOpen: boolean;
    setParkId: (parkId: number) => void;
    setCoefList: (coefList: CoefModel[]) => void;
    setRouteData: (data: DiffNormData) => void;
    editRouteData: (data: DiffNormItem[]) => void;
    setRouteOpen: () => void;
    setModelOpen: () => void;
    setCoefOpen: () => void;
}

export const useDiffNormStore = create<IDiffNorm>(
    (set: SetState<IDiffNorm>) => ({
        park_id: 138,
        routeData: {} as DiffNormData,
        coefList: [],
        isRouteOpen: false,
        isModelOpen: false,
        isCoefOpen: false,
        setParkId: (park_id) => set({park_id}),
        setRouteData: (routeData) => set({routeData}),
        setCoefList: (coefList) => set({coefList}),
        editRouteData: (data) =>
            set(
                produce((state: IDiffNorm) => {
                    state.routeData.diffNormItems = data;
                }),
            ),
        setRouteOpen: () => set((state) => ({isRouteOpen: !state.isRouteOpen})),
        setModelOpen: () => set((state) => ({isModelOpen: !state.isModelOpen})),
        setCoefOpen: () => set((state) => ({isCoefOpen: !state.isCoefOpen})),
    }),
);
