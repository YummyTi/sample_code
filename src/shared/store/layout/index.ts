import produce from 'immer';
import create, {GetState, SetState} from 'zustand';

interface ILayout {
    open: boolean;
    handleTap: (payload: boolean) => void;
}

export const useLayoutStore = create<ILayout>(
    (set: SetState<ILayout>, get: GetState<ILayout>) => ({
        open: true,
        handleTap: (payload): void => {
            set(produce(() => ({open: payload})));
        },
    }),
);
