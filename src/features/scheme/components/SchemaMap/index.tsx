import React, {useEffect, useRef} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {
    Map,
    Placemark,
    RulerControl,
    TrafficControl,
    YMaps,
    ZoomControl,
} from 'react-yandex-maps';
import {v4 as uuid} from 'uuid';
import shallow from 'zustand/shallow';

import {IStation} from '@models/station_model';
import {constants, locationParser} from '@shared/helpers';
import {useStationsStore} from '@store/station';

// const SchemaCluster = lazy(() => import('../SchemaCluster'));

const {MAP_ICON, YENUM, tashkentzoom, yQuery} = constants;

const mapState = {
    center: tashkentzoom,
    zoom: 12,
    behaviors: ['default', 'scrollZoom'],
    controls: [],
};

const SchemaMap = () => {
    const map = useRef<any>(null);

    const {stations, coords, polyLines, setCoords, setPolyLines, setDragLast} =
        useStationsStore((state) => ({...state}), shallow);

    useEffect(() => {
        return () => {
            setCoords([]);
            setPolyLines([]);
            setDragLast([]);
        };
    }, []);

    const addStation = (crds: IStation) => {
        console.log('adding stations');
        setCoords([
            ...coords,
            {
                ...crds,
                uniqeId: uuid(),
            },
        ]);
        setPolyLines([...polyLines, [crds.lat, crds.lng]]);
    };

    // const onMapClick = (event: any) => {
    //     const cordinate = event.get('coords');

    //     console.log(lastCordinate, 'last coordination');
    //     if (lastCordinate?.lat) {
    //         const findedIndex = coords.findIndex(
    //             (item: any) => item.uniqeId === lastCordinate.uniqeId,
    //         );

    //         // Coordinates
    //         coords.splice(findedIndex, 0, {
    //             lat: cordinate[0],
    //             lng: cordinate[1],
    //             uniqeId: uuid(),
    //         });
    //         coords.join();
    //         setCoords(coords);
    //         // Polylines
    //         polyLines.splice(findedIndex, 0, cordinate);
    //         polyLines.join();
    //         setPolyLines(polyLines);

    //         setLastCordinate({});
    //     } else {
    //         setCoords([
    //             ...coords,
    //             {lat: cordinate[0], lng: cordinate[1], uniqeId: uuid()},
    //         ]);

    //         setPolyLines([...polyLines, cordinate]);
    //     }
    // };

    const parsedCoords = locationParser.locatioParser(coords);

    useEffect(() => {
        if (coords) {
            if (map) {
                console.log('logged set url');
                map.current?.behaviors.get('ruler').setState(parsedCoords);
            }
        }
    }, [map, coords]);

    const handleClick = () => {
        const latLngs = map.current?.behaviors
            .get('ruler')
            .geometry.getCoordinates();

        console.log(latLngs, 'latLngs');
        setCoords(
            latLngs.map((item: any) => ({
                lat: item[0],
                lng: item[1],
            })),
        );
    };

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                console.log('click outside');
                handleClick();
            }}
        >
            <YMaps query={yQuery}>
                <Map
                    style={{
                        width: '100%',
                        height: '65vh',
                        transition: 'all 0.5s linear',
                    }}
                    defaultState={mapState}
                    modules={[YENUM.MODULE]}
                    // onClick={onMapClick}
                    //@ts-ignore
                    instanceRef={map}
                    state={mapState}
                    options={{
                        maxZoom: 40,
                    }}
                >
                    {stations?.length > 0 &&
                        stations.map((coord) => {
                            return (
                                <Placemark
                                    key={coord.id}
                                    geometry={[coord.lat, coord.lng]}
                                    onClick={() => addStation(coord)}
                                    // onContextMenu={() => handleContext(coord)}
                                    options={{
                                        iconLayout: 'default#image',
                                        iconImageSize: [25, 35],
                                        iconImageHref:
                                            coord?.station_type === 1
                                                ? MAP_ICON.STATION
                                                : MAP_ICON.KPP_BUS,
                                    }}
                                />
                            );
                        })}

                    <RulerControl
                        onClick={handleClick}
                        options={{
                            float: 'left',
                        }}
                        onLoad={(e: any) => {
                            // if (map && coords?.length > 0) {
                            // console.log('zoom INNNN');
                            // map.current?.setCenter(
                            //     [coords[0]?.lat, coords[0]?.lng],
                            //     15,
                            // );
                            // map.current?.behaviors
                            //     .get('ruler')
                            //     .setState(parsedCoords);
                            // }
                        }}
                    />

                    <TrafficControl options={{float: 'right'}} />
                    <ZoomControl options={{float: 'right'}} />
                </Map>
            </YMaps>
        </OutsideClickHandler>
    );
};

export default SchemaMap;
