import produce from 'immer';
import create, {GetState, SetState} from 'zustand';

interface IMain {
    open: boolean;
    openSide: boolean;
    openUpdate: boolean;
    openPop: HTMLElement | null;
    setOpenPop: (payload: any) => void;
    handleOpenUpdate: (payload: boolean) => void;
    setOpenSide: (payload: boolean) => void;
    handleTap: (payload: boolean) => void;
}

export const useMainStore = create<IMain>(
    (set: SetState<IMain>, get: GetState<IMain>) => ({
        open: false,
        openSide: false,
        openUpdate: false,
        openPop: null,
        setOpenPop: (payload): void => {
            set({openPop: payload});
        },
        handleOpenUpdate: (payload: boolean) => {
            set(() => ({openUpdate: payload}));
        },
        setOpenSide: (payload: boolean) => {
            set(() => ({openSide: payload}));
        },
        handleTap: (payload): void => {
            set(produce(() => ({open: payload})));
        },
    }),
);
