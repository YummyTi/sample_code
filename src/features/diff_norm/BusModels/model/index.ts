import {useCheckbox} from '@entities/selected-checkbox';
import {useEffect, useMemo} from 'react';
import shallow from 'zustand/shallow';

import {useAllBusModel} from '@api/bus_model/hooks';
import {useSaveModels} from '@api/diff_norm/mutations';
import {IBusModelJSON} from '@models/bus_model';
import {useDiffNormStore} from '@store/race_fuel';

interface ISelected extends IBusModelJSON {
    col1: number;
}

export const useBusModelsHook = () => {
    const handleSave = useSaveModels();
    const {isLoading: dataLoading, data} = useAllBusModel();
    const {setModelOpen, routeData} = useDiffNormStore(
        (state) => state,
        shallow,
    );
    const {isChecked, toggleCheckbox, setSelected, selected} =
        useCheckbox<ISelected>();

    const busModelData = useMemo(
        () => data?.map((v) => ({...v, col1: v.id})),
        [data],
    );

    useEffect(() => {
        busModelData?.length &&
            setSelected(
                busModelData?.filter((item) =>
                    routeData?.diffNormItems?.some(
                        (e) => e.bus_model_id === item.id,
                    ),
                ),
            );
    }, [busModelData]);

    useEffect(() => {
        if (handleSave.isSuccess) {
            setModelOpen();
        }
    }, [handleSave.isSuccess]);

    const handleSubmit = () => {
        handleSave.mutate({
            bus_model_ids: selected?.map((elem) => elem.id),
            route_id: routeData.route_id,
        });
    };

    return {
        busModelData,
        dataLoading,
        isLoading: handleSave.isLoading,
        isChecked,
        toggleCheckbox,
        handleSubmit,
    };
};
