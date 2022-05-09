import create from 'zustand';
import shallow from 'zustand/shallow';

type CheckboxModel<T> = {
    selected: T[];
    setSelected: (selected: T[]) => void;
};

const useStoreBase = create<CheckboxModel<unknown>>((set) => ({
    selected: [],
    setSelected: (selected) => set({selected}),
}));

export const useCheckboxModel = <Item>(
    selector: (state: CheckboxModel<Item>) => CheckboxModel<Item>,
) => useStoreBase(selector, shallow);
