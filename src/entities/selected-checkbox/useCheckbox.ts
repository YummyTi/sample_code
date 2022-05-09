import {useCallback} from 'react';

import {useCheckboxModel} from './model';

export const useCheckbox = <T extends {col1: number}>() => {
    const {selected, setSelected} = useCheckboxModel<T>((state) => state);

    const toggleCheckbox = useCallback(
        (row: T) => {
            const isAdded = selected?.some((item) => item.col1 === row.col1);

            if (!isAdded) {
                setSelected([...selected, row]);
            } else {
                const filteredItem = selected?.filter(
                    (item) => item.col1 !== row.col1,
                );
                setSelected(filteredItem);
            }
        },
        [selected, setSelected],
    );

    const isChecked = useCallback(
        (row: T) => {
            return selected?.some((item) => item.col1 === row.col1);
        },
        [selected],
    );

    return {
        isChecked,
        toggleCheckbox,
        setSelected,
        selected,
    };
};
