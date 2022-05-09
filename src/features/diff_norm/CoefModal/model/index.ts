import dayjs from 'dayjs';
import {useEffect, useMemo, useRef} from 'react';
import shallow from 'zustand/shallow';

import {useSaveCoef} from '@api/diff_norm/mutations';
import {CoefModel} from '@models/diff_norm_models';
import {useDiffNormStore} from '@store/race_fuel';

export const useCoefModalHook = (coefData: CoefModel[] | undefined) => {
    const coefficient = useRef<HTMLInputElement>(null);
    const amount = useRef<HTMLInputElement>(null);

    const handleSave = useSaveCoef();
    const {coefList} = useDiffNormStore((state) => state, shallow);

    useEffect(() => {
        if (
            handleSave.isSuccess &&
            coefficient.current?.value &&
            amount.current?.value
        ) {
            coefficient.current.value = '';
            amount.current.value = '';
        }
    }, [handleSave.isSuccess]);

    const data = useMemo(
        () =>
            coefList.map((elem) => ({
                ...elem,
                last_date: dayjs
                    .unix(elem.last_date)
                    .format('DD-MM-YYYY HH:mm'),
            })),
        [coefList],
    );

    const onSave = () => {
        if (coefficient.current?.value && amount.current?.value) {
            handleSave.mutate({
                id: null,
                coefficient: parseFloat(coefficient.current?.value),
                amount: parseFloat(amount.current?.value),
            });
        } else if (coefData !== coefList) {
            coefList.forEach((item) =>
                handleSave.mutate({
                    id: item.id,
                    coefficient: parseFloat(
                        item.coefficient as unknown as string,
                    ),
                    amount: parseFloat(item.amount as unknown as string),
                }),
            );
        }
    };

    const values = useMemo(
        () => ({
            coefficient,
            amount,
        }),
        [coefficient.current?.value, amount.current?.value],
    );

    return {
        saveLoading: handleSave.isLoading,
        data,
        values,
        onSave,
    };
};
