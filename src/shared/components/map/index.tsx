// @ts-nocheck
import {Collapse, Fade} from '@mui/material';
import {motion} from 'framer-motion';
// import {useMapStore} from '@src/store/map';
// import produce from 'immer';
import React, {useEffect, useRef, useState} from 'react';
import {
    Clusterer,
    FullscreenControl,
    Map,
    ObjectManager,
    Placemark,
    Polyline,
    RulerControl,
    TrafficControl,
    YMaps,
    ZoomControl,
} from 'react-yandex-maps';
import {v4 as uuid} from 'uuid';
import shallow from 'zustand/shallow';

import bus from '@src/assets/bus.png';
import {IBusStops} from '@src/shared/models/bus_stop_model';
import {useMapStore} from '@src/shared/store/map';

import {constants} from '@shared/helpers';

import {mapsLats, parser} from './constants';

const {MAP_ICON, YENUM, tashkentzoom, yQuery, yStyle} = constants;

// import {mapsLats} from './constants';

interface IGeo {
    lat: number;
    lng: number;
    id?: string | number;
}

interface IMap {
    id: number;
    lat: number;
    lng: number;
}

const mapCoords: IMap[] = [
    {id: 1, lat: 41.32847446609404, lng: 69.24298268717716},
    {id: 2, lat: 41.31847446609404, lng: 69.25298268717715},
    {id: 3, lat: 41.32947446609404, lng: 69.22298268717714},
    {id: 4, lat: 41.33147446609404, lng: 69.21298268717719},
];

interface IProps {
    data?: any;
}

const mapState = {
    center: tashkentzoom,
    zoom: 12,
    behaviors: ['default', 'scrollZoom'],
    controls: [],
};

const MapY = ({data}: IProps) => {
    // const {buses, setBuses} = useMapStore((state) => ({...state}), shallow);
    const map = useRef<any>(null);
    const [coords, setCoords] = useState<any>([]);
    const [polyLines, setPolyLines] = useState<any>([]);
    const [lastCordinate, setLastCordinate] = useState<any>({});
    const [loc, setLoc] = useState<any>([41.32847446609404, 69.24298268717716]);
    const [open, setOpen] = useState(false);

    const onMapClick = (event: any) => {
        const cordinate = event.get('coords');

        console.log(lastCordinate, 'last coordination');
        if (lastCordinate?.lat) {
            const findedIndex = coords.findIndex(
                (item: any) => item.id === lastCordinate.id,
            );

            // Coordinates
            coords.splice(findedIndex, 0, {
                lat: cordinate[0],
                lng: cordinate[1],
                id: uuid(),
            });
            coords.join();
            setCoords(coords);
            // Polylines
            polyLines.splice(findedIndex, 0, cordinate);
            polyLines.join();
            setPolyLines(polyLines);

            setLastCordinate({});
        } else {
            setCoords((crds: any) => [
                ...crds,
                {lat: cordinate[0], lng: cordinate[1], id: uuid()},
            ]);

            setPolyLines((polilines: any) => [...polilines, cordinate]);
        }
    };

    const handleContext = (crds: any) => {
        setCoords((lastCrds: any) =>
            lastCrds.filter((item: any) => item.id !== crds.id),
        );
        setPolyLines((polilines: any) =>
            polilines.filter(
                (item: any) => item[0] !== crds.lat && item[1] !== crds.lng,
            ),
        );
    };

    const getPointData = (index: any) => {
        return {
            balloonContentBody:
                'placemark <strong>balloon ' + index + '</strong>',
            clusterCaption: 'placemark <strong>' + index + '</strong>',
        };
    };

    const refreshClock = () => {
        setLoc((prev: any) => [prev[0] + 0.00001, prev[1] + 0.00001]);
        // setStations(
        //     stations.map((item: any) => ({
        //         ...item,
        //         lat: item.lat + 0.1,
        //         lng: item.lng + 0.1,
        //     })),
        // );
    };

    // useEffect(() => {
    //     const timerId = setInterval(refreshClock, 100);
    //     return function cleanup() {
    //         clearInterval(timerId);
    //     };
    // }, []);

    // console.log(map?.current?.behaviors?.get('ruler'), 'stations');

    useEffect(() => {
        if (!open && map.current) {
            console.log(
                map?.current?.behaviors.get('ruler').geometry.getCoordinates(),
                'coordinates',
            );
            map.current.behaviors.get('ruler').setState('');
        }
    }, [open]);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <YMaps query={yQuery}>
            <Map
                style={yStyle}
                defaultState={mapState}
                // onClick={onMapClick}
                modules={[YENUM.MODULE]}
                onMouseUp={(e: any) => {
                    // if (map.current) {
                    console.log(
                        map?.current?.behaviors
                            .get('ruler')
                            .geometry.getCoordinates(),
                        'lat and lngs',
                    );
                    // }
                }}
                onMouseOut={(e: any) => {
                    console.log('out mouse');
                }}
                // onLoad={addRoute}
                //@ts-ignore
                instanceRef={map}
                state={mapState}
                options={{
                    maxZoom: 20,
                }}
                // className={styles}
            >
                <RulerControl
                    onClick={handleClick}
                    onLoad={(e) => {
                        // Run this function when ruler will be ready
                        // This is init ruler state https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/behavior.Ruler.html#method_detail__setState
                        // const state =
                        //     '69.24298268717716,41.32847446609404~0.009999999999990905,-0.010000000000005116~-0.030000000000015348,0.011000000000002785~-0.009999999999948272,0.0020000000000024443';
                        const state = parser();
                        if (map.current) {
                            map.current.behaviors.get('ruler').setState(state);
                        }
                    }}
                    options={{
                        float: 'right',
                    }}
                />
                <Polyline
                    geometry={polyLines}
                    options={{
                        balloonCloseButton: false,
                        strokeColor: '#000',
                        strokeWidth: 4,
                        strokeOpacity: 0.5,
                    }}
                />
                {/* <Clusterer
                    // options={{
                    //     // preset: 'islands#invertedLightBlueClusterIcons',
                    //     // preset: 'islands#invertedVioletClusterIcons',
                    //     preset: 'islands#invertedDarkOrangeClusterIcons',
                    //     groupByCoordinates: false,
                    //     //             preset: "islands#invertedVioletClusterIcons",
                    //     // clusterDisableClickZoom: true,
                    //     clusterHideIconOnBalloonOpen: false,
                    //     geoObjectHideIconOnBalloonOpen: false,
                    // }}
                    options={{
                        preset: 'islands#invertedVioletClusterIcons',
                        groupByCoordinates: false,
                        clusterDisableClickZoom: false,
                        clusterHideIconOnBalloonOpen: false,
                        geoObjectHideIconOnBalloonOpen: false,
                    }}
                > */}
                {/* {buses?.length > 0 &&
                    buses?.map((coordsMain: IBusStops, index: number) => {
                        // console.log(coordsMain.loc.coordinates, 'cords');
                        return (
                            // <motion.div>
                            <Placemark
                                key={index}
                                geometry={coordsMain.loc}
                                // properties={getPointData(coordsMain.bus.gosno)}
                                // options={{
                                //     preset: 'islands#violetIcon',
                                //     iconLayout: 'default#image',
                                //     // iconImageSize: [35, 35],
                                //     iconImageHref: bus,
                                //     // 'https://www.svgrepo.com/show/14932/bus.svg'
                                // }}
                            />
                            // </motion.div>
                        );
                    })} */}
                {/* </Clusterer> */}

                {/* {data?.map((coordsMain: any) => (
                    <Placemark
                        key={coordsMain?.bus?.busid}
                        geometry={coordsMain?.loc?.coordinates}
                        options={{
                            iconLayout: 'default#image',
                            iconImageSize: [30, 30],
                            iconImageHref: bus,
                            // 'https://www.svgrepo.com/show/14932/bus.svg'
                        }}
                    />
                ))} */}

                {/* {coords.map((coordsMain: any) => {
                    return (
                        <Placemark
                            key={coordsMain.id}
                            geometry={[coordsMain.lat, coordsMain.lng]}
                            onClick={() => {
                                setLastCordinate(coordsMain);
                            }}
                            onContextMenu={() => handleContext(coordsMain)}
                        />
                    );
                })} */}
                {/* <motion.div transition={{type: 'spring'}}> */}
                {/* <Placemark
                    geometry={loc}
                    style={{
                        transition: 'all 0.5s linear',
                    }}
                    options={{
                        preset: 'islands#blackStretchyIcon',
                        // The placemark can be moved.
                        draggable: true,
                    }}
                    // properties={getPointData(coordsMain.bus.gosno)}
                    // options={{
                    //     preset: 'islands#violetIcon',
                    //     iconLayout: 'default#image',
                    //     // iconImageSize: [35, 35],
                    //     iconImageHref: bus,
                    //     // 'https://www.svgrepo.com/show/14932/bus.svg'
                    // }}
                /> */}
                {/* </motion.div> */}

                {/* {latlngs.map((coordsMain: any) => {
                    return (
                        <Placemark
                            key={uuid()}
                            geometry={[coordsMain.lat, coordsMain.lng]}
                            onClick={() => {
                                setLastCordinate(coordsMain);
                            }}
                            options={{
                                iconLayout: 'default#image',
                                iconImageSize: [50, 50],
                                iconImageHref: '../../assets/bus.png',
                            }}
                            onContextMenu={() => handleContext(coordsMain)}
                        />
                    );
                })} */}
                {/* <ObjectManager
                    // onClick={onStationClick}
                    // onContextMenu={handleContext}
                    options={{
                        clusterize: true,
                        gridSize: 40,
                    }}
                    // objects={{
                    //     openBalloonOnClick: true,
                    // }}
                    features={stations.map((item) => ({
                        type: 'Feature',
                        id: item.id,
                        geometry: {
                            type: 'Point',
                            coordinates: [item.lat, item.lng],
                        },
                        properties: {item},
                        options: {
                            iconLayout: 'default#image',
                            iconImageSize: [25, 35],
                            iconImageHref: MAP_ICON.BUS,
                        },
                    }))}
                    modules={[
                        'objectManager.addon.objectsBalloon',
                        'objectManager.addon.objectsHint',
                    ]}
                /> */}

                {mapsLats.map((item) => {
                    return (
                        <Placemark
                            key={item.id}
                            geometry={[item.lat, item.lng]}
                        />
                    );
                })}

                <ObjectManager
                    // onClick={onStationClick}
                    // onContextMenu={handleContext}
                    options={{
                        clusterize: true,
                        gridSize: 40,
                    }}
                    // objects={{
                    //     openBalloonOnClick: true,
                    // }}
                    features={loc.map((item: any, index: number) => ({
                        type: 'Feature',
                        id: index,
                        geometry: {
                            type: 'Point',
                            coordinates: item,
                        },
                        properties: {item},
                        options: {
                            iconLayout: 'default#image',
                            iconImageSize: [25, 35],
                            iconImageHref: MAP_ICON.BUS,
                        },
                    }))}
                    modules={[
                        'objectManager.addon.objectsBalloon',
                        'objectManager.addon.objectsHint',
                    ]}
                />
                <FullscreenControl />
                <TrafficControl options={{float: 'right'}} />
                <ZoomControl options={{float: 'right'}} />
            </Map>
        </YMaps>
    );
};

export default MapY;
