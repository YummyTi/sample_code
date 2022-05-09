// @ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {
    FullscreenControl,
    Map,
    Polygon,
    RulerControl,
    YMaps,
    ZoomControl,
} from 'react-yandex-maps';
import shallow from 'zustand/shallow';

import {IPolygonModel} from '@src/shared/models/polygon_model';
import {usePolygonStore} from '@src/shared/store/polygon';

import {constants, helper} from '@shared/helpers';

import styles from './index.module.scss';

const {YENUM, tashkentzoom, yQuery, yStyle} = constants;
const {parsedColorText, stringToRgba} = helper;

const mapState = {
    center: tashkentzoom,
    zoom: 12,
    behaviors: ['default', 'scrollZoom'],
    controls: [],
};

interface LocationState {
    state: IPolygonModel;
}

const MapY = () => {
    // const map = useRef<any>(null);
    const [map, setYMap] = useState<any>(null);
    const [draw, setDraw] = useState(false);
    const location = useLocation();
    const query = location as LocationState;

    const {fillColor, setOpenSide, polygon, setPolygon, setColor} =
        usePolygonStore((state) => ({...state}), shallow);

    const handleClick = () => {
        setDraw(!draw);
    };

    const handlePolygon = (e: any) => {
        // setOpenSide(true);
    };

    const handleContext = () => {
        // setPolygon([]);
        setOpenSide(false);
    };

    // useEffect(() => {
    //     const latLngs = map?.behaviors.get('ruler').geometry.getCoordinates();
    //     if (!draw && latLngs?.length > 1) {
    //         setPolygon(latLngs);
    //         setOpenSide(true);
    //         map?.behaviors.get('ruler').setState('');
    //     }
    // }, [draw]);

    useEffect(() => {
        if (query.state?.coordinates?.length && map) {
            const location = query.state?.coordinates[4];
            setPolygon(
                query.state.coordinates?.map((coord: any) => {
                    return [coord.lat, coord.lng];
                }),
            );

            setColor(
                stringToRgba(
                    parsedColorText(query.state?.color || 'rgba(0, 0, 0, 0.5)'),
                ),
            );

            map.setCenter([location?.lat, location?.lng], 17);
        }
    }, [query.state?.coordinates, map]);

    return (
        <div className={styles.container}>
            <YMaps query={yQuery}>
                <Map
                    style={yStyle}
                    defaultState={mapState}
                    // onClick={onMapClick}
                    modules={[YENUM.MODULE]}
                    //@ts-ignore
                    instanceRef={(ref) => {
                        setYMap(ref);
                    }}
                    state={mapState}
                    options={{
                        maxZoom: 20,
                    }}
                >
                    <Polygon
                        geometry={[polygon]}
                        onClick={handlePolygon}
                        onContextMenu={handleContext}
                        options={{
                            editorDrawingCursor: 'crosshair',
                            editorMaxPoints: 5,

                            fillColor: fillColor,
                            // Цвет обводки.
                            strokeColor: 'rgba(0, 0, 0, 0.5)',
                            // Ширина обводки.
                            strokeWidth: 5,
                        }}
                    />

                    <ZoomControl options={{float: 'right'}} />
                    <FullscreenControl />
                    {query.state.id ? null : (
                        <RulerControl
                            onClick={handleClick}
                            options={{
                                float: 'right',
                            }}
                        />
                    )}
                </Map>
            </YMaps>
        </div>
    );
};

export default MapY;

// (e) => {
// Run this function when ruler will be ready
// This is init ruler state https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/behavior.Ruler.html#method_detail__setState
// const state =
//     '37.57660258,55.69576899~-0.01098633,0.09605884~0.12634277,0.00309472';

// if (map.current) {
//     map.current.behaviors.get('ruler').setState(state);
// }
// }
// yandexRef.setCenter([lat,lng],zoom)
// {
/* <ObjectManager
options={{
    clusterize: true,
    gridSize: 40,
}}
// features={loc.map((item: any, index: number) => ({
//     type: 'Feature',
//     id: index,
//     geometry: {
//         type: 'Point',
//         coordinates: item,
//     },
//     properties: {item},
//     options: {
//         iconLayout: 'default#image',
//         iconImageSize: [25, 35],
//         iconImageHref: MAP_ICON.BUS,
//     },
// }))}
modules={objectModule}
/> */
// }
