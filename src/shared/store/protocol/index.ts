import create, {SetState} from 'zustand';

export interface IKpp {
    kpp1Data: IKpp[];
    kpp2Data: IKpp[];
    setKpp2: (payload: any) => any;
    setKpp1: (payload: any) => any;
}

export const useKPPStore = create<IKpp>((set: SetState<IKpp>) => ({
    kpp1Data: [],
    kpp2Data: [],
    setKpp1: (payload) => set((state) => ({kpp1Data: payload})),
    setKpp2: (payload) => set((state) => ({kpp2Data: payload})),
}));
