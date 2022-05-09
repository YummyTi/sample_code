import {useEffect, useRef, useState} from 'react';
import {v4 as uuid} from 'uuid';
import shallow from 'zustand/shallow';

import {useMainStore} from '@store/main';
import {useStationsListStore} from '@store/stations_list';

interface ICoords {
    lat: number;
    lng: number;
    id?: string | number;
}

export const useCheckpointsHook = () => {
    const map = useRef<any>(null);
    const [coords, setCoords] = useState<ICoords>({} as ICoords);
    const [yandexRef, setYandexRef] = useState<any>(null);

    const {
        stationsList,
        zoomCoords,
        station,
        setStation,
        setZoomCoords,
        setDraggableStation,
        draggableStation,
        isEditable,
    } = useStationsListStore((state) => state, shallow);
    const {setOpenSide, handleTap} = useMainStore((state) => state, shallow);

    useEffect(() => {
        yandexRef?.setCenter(zoomCoords, 18);
    }, [map, zoomCoords]);

    const onMapClick = (event: any) => {
        if (!isEditable) {
            const coordinate = event.get('coords');
            setCoords({
                lat: coordinate[0],
                lng: coordinate[1],
                id: uuid(),
            });
            handleTap(true);
        }
    };

    const onStationClick = (event: any) => {
        if (!isEditable) {
            const foundStation = stationsList.find(
                (station) => station.id === event.get('objectId'),
            );

            if (foundStation && station?.id !== foundStation.id) {
                setZoomCoords([foundStation.lat, foundStation.lng]);
                setStation(foundStation);
                setOpenSide(true);
            }
        }
    };

    const handleDragEnd = (dragCoords: number[]) => {
        setDraggableStation({
            ...draggableStation,
            lat: dragCoords[0],
            lng: dragCoords[1],
        });
    };

    return {
        map,
        coords,
        stationsList,
        setYandexRef,
        onMapClick,
        onStationClick,
        handleDragEnd,
    };
};
