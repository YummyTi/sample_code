import {useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import shallow from 'zustand/shallow';

import {useDeleteStation, useSaveStation} from '@api/stations_list/mutations';
import {NameIdArrType} from '@models/name_id_arr_type';
import {Options} from '@models/options_model';
import {IStation} from '@models/station_model';
import {useMainStore} from '@store/main';
import {useStationsListStore} from '@store/stations_list';

import {ISubmitStation, useTypeOptions} from '../../lib';

export const useRightBarLogic = () => {
    const [stationState, setStationState] = useState<IStation>({} as IStation);
    const [visible, setVisible] = useState(true);
    const [isDeleting, setDeleting] = useState(false);

    const {setOpenSide, openSide} = useMainStore((state) => state, shallow);
    const {
        editStation,
        stationsList,
        isEditable,
        routes,
        station,
        draggableStation,
        setDraggableStation,
        setRoutes,
        setEditable,
        setStation,
        setZoomCoords,
        removeStation,
    } = useStationsListStore((state) => state, shallow);
    const typeOptions = useTypeOptions();
    const saveStation = useSaveStation();
    const deleteStation = useDeleteStation();

    const {control, handleSubmit, reset, setValue} = useForm<ISubmitStation>();

    const stationData = useMemo(
        () =>
            ({
                ...station,
                station_type: typeOptions?.find(
                    (item) => item.value === station?.station_type,
                ) as Options,
            } as ISubmitStation),
        [station, typeOptions],
    );

    useEffect(() => {
        if (isEditable && stationData) {
            Object.keys(stationData).forEach((key: keyof ISubmitStation) => {
                if (stationData?.[key]) setValue(key, stationData?.[key]);
            });
        }
        setRoutes(stationData?.routes);
    }, [isEditable, stationData]);

    useEffect(() => {
        setDraggableStation({} as IStation);
        reset();
    }, [openSide, station?.id]);

    useEffect(() => () => handleClose(), []);

    useEffect(() => {
        if (saveStation.isSuccess) {
            setDraggableStation({} as IStation);
            editStation(stationState);
            setStation(stationState);
            setEditable(false);
            reset();
            setRoutes([]);
        }
    }, [saveStation.isSuccess]);

    useEffect(() => {
        if (deleteStation.isSuccess) {
            removeStation(station?.id);
            setDeleting(false);
            setOpenSide(false);
        }
    }, [deleteStation.isSuccess]);

    const onSearchClick = (value: NameIdArrType) => {
        setVisible(false);
        const searchedStation = stationsList.find(
            (item) => item.id === value.id,
        );
        if (searchedStation) {
            setStation(searchedStation);
            setZoomCoords([searchedStation.lat, searchedStation.lng]);
        }
    };

    const handleClose = () => {
        setDraggableStation({} as IStation);
        setStation({} as IStation);
        setEditable(false);
        setOpenSide(false);
        setRoutes([]);
        reset();
    };

    const handleCancel = () => {
        setDraggableStation({} as IStation);
        setEditable(false);
        setRoutes([]);
        reset();
    };

    const filterRoutes = (routes: string[], newRoutes: {route: string}[]) => {
        const combinedRoutes = routes?.concat(
            newRoutes?.map((elem) => elem.route.toUpperCase()),
        );
        const filteredRoutes = combinedRoutes?.filter(
            (item, i) => item !== '' && combinedRoutes.indexOf(item) === i,
        );

        return filteredRoutes;
    };

    const onSubmit = (data: ISubmitStation) => {
        const saveData = {
            id: station.id,
            lat: draggableStation?.lat || station.lat,
            lng: draggableStation?.lng || station.lng,
            name: data?.name,
            remark: data?.remark || null,
            stat_uniq_id: parseInt(data?.stat_uniq_id as any) || null,
            station_type: data?.station_type?.value || 1,
            routes: filterRoutes(routes, data?.routesInputs),
        };
        setStationState(saveData as IStation);
        saveStation.mutate(saveData);
    };

    return {
        typeOptions,
        control,
        handleSubmit,
        onSearchClick,
        handleClose,
        handleCancel,
        onSubmit,
        visible,
        setVisible,
        isDeleting,
        setDeleting,
        deleteStation,
        saveStation,
    };
};
