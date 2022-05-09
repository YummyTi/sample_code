import React from 'react';
import {
    Map,
    ObjectManager,
    Placemark,
    YMaps,
    ZoomControl,
} from 'react-yandex-maps';
import shallow from 'zustand/shallow';

import {useStations} from '@api/stations_list/hooks';
import {AddModal, RightBar} from '@features/checkpoints';
import {constants} from '@shared/helpers';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {useMainStore} from '@store/main';
import {useStationsListStore} from '@store/stations_list';

import s from './index.module.scss';
import {useCheckpointsHook} from './useCheckpointsHook';

const mapState = {
    center: constants.tashkentzoom,
    zoom: 12,
    behaviors: ['default', 'scrollZoom'],
    controls: [],
};

const CheckpointsPage = () => {
    const isLoading = useStations();
    const {openSide, open} = useMainStore((state) => state, shallow);
    const {station, draggableStation} = useStationsListStore(
        (state) => state,
        shallow,
    );
    const {canEdit} = useLocationPermission();
    const {
        coords,
        stationsList,
        setYandexRef,
        onMapClick,
        onStationClick,
        handleDragEnd,
    } = useCheckpointsHook();

    const {yQuery, MAP_ICON} = constants;

    return (
        <YMaps query={yQuery}>
            <Map
                style={{
                    width: '100%',
                    height: '100%',
                    transition: 'all 0.5s linear',
                }}
                defaultState={mapState}
                onClick={onMapClick}
                modules={['multiRouter.MultiRoute']}
                state={mapState}
                options={{
                    maxZoom: 20,
                }}
                instanceRef={(ref: any) => setYandexRef(ref)}
            >
                <ObjectManager
                    onClick={onStationClick}
                    options={{
                        clusterize: true,
                        gridSize: 40,
                    }}
                    features={stationsList?.map((item) => ({
                        type: 'Feature',
                        id: item?.id,
                        draggable: true,
                        geometry: {
                            type: 'Point',
                            coordinates:
                                draggableStation?.id !== item?.id
                                    ? [item?.lat, item?.lng]
                                    : [0, 0],
                        },
                        options: {
                            iconLayout: 'default#image',
                            iconImageSize: [25, 35],
                            iconImageHref:
                                item?.station_type === 2
                                    ? MAP_ICON.KPP_BUS
                                    : MAP_ICON.STATION,
                        },
                    }))}
                    modules={[
                        'objectManager.addon.objectsBalloon',
                        'objectManager.addon.objectsHint',
                    ]}
                />

                {open && (
                    <Placemark
                        geometry={[coords?.lat, coords?.lng]}
                        options={{
                            iconLayout: 'default#image',
                            iconImageSize: [25, 35],
                            iconImageHref: MAP_ICON.POINT,
                        }}
                    />
                )}

                {draggableStation?.lat && (
                    <Placemark
                        geometry={[
                            draggableStation?.lat,
                            draggableStation?.lng,
                        ]}
                        options={{
                            iconLayout: 'default#image',
                            iconImageSize: [25, 35],
                            iconImageHref: MAP_ICON.POINT,
                            draggable: true,
                        }}
                        onDragEnd={(e: any) =>
                            handleDragEnd(
                                e.get('target').geometry.getCoordinates(),
                            )
                        }
                    />
                )}

                {openSide && <RightBar />}

                {open && canEdit && <AddModal coords={coords} />}

                {isLoading && <div className={s.dark} />}

                <ZoomControl options={{float: 'right'}} />
            </Map>
        </YMaps>
    );
};

export default CheckpointsPage;
