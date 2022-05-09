// @ts-nocheck
import React, {useEffect, useState} from 'react';
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

import {IPolygonModel} from '@models/polygon_model';
import {constants, helper, locationParser} from '@shared/helpers';
import {usePolygonStore} from '@store/polygon';

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
    const [map, setYMap] = useState<any>(null);
    const [draw, setDraw] = useState(false);
    const location = useLocation();
    const query = location as LocationState;

    const {fillColor, setOpenSide, polygon, setPolygon, setColor} =
        usePolygonStore((state) => ({...state}), shallow);

    const handleClick = () => {
        setDraw(!draw);
    };

    const handleContext = () => {
        console.log('handleContext');
        setPolygon([]);
        setOpenSide(false);
    };

    const handlePolygon = (e: any) => {
        setOpenSide(true);
    };

    const handleRef = (ref: any) => {
        setYMap(ref);
    };

    useEffect(() => {
        const latLngs = map?.behaviors.get('ruler').geometry.getCoordinates();
        console.log(latLngs, 'latLngs');
        if (!draw && latLngs?.length > 1) {
            setPolygon(latLngs);
            setOpenSide(true);
            // map?.behaviors?.get('ruler').setState('');
        }
    }, [draw]);

    useEffect(() => {
        if (query.state?.coordinates?.length && map) {
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

            const location = query.state?.coordinates[4];

            console.log(location, 'location');
            map.setCenter([location?.lat, location?.lng], 17);
        }
    }, [query.state?.coordinates, map]);

    const handleSet = () => {
        const latLngs = map?.behaviors.get('ruler').geometry.getCoordinates();
        setPolygon(latLngs);
    };

    return (
        <div className={styles.container}>
            <YMaps query={yQuery}>
                <Map
                    style={yStyle}
                    defaultState={mapState}
                    // onClick={onMapClick}
                    onMouseUp={(e: any) => {
                        const latLngs = map?.behaviors
                            .get('ruler')
                            .geometry.getCoordinates();
                        setPolygon(latLngs);
                    }}
                    onMouse
                    onDrag={(e: any) => {
                        handleSet();
                    }}
                    modules={[YENUM.MODULE]}
                    instanceRef={(ref) => {
                        handleRef(ref);
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
                        onMouseLeave={() => handleSet()}
                        onMouseEnter={() => handleSet()}
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
                    <RulerControl
                        onClick={handleClick}
                        onLoad={(e: any) => {
                            const parsedCoords = locationParser.locatioParser(
                                query?.state?.coordinates,
                            );
                            console.log(parsedCoords, '=== 1111 coords parse');

                            if (map) {
                                map.behaviors
                                    .get('ruler')
                                    .setState(parsedCoords);
                            }
                        }}
                        options={{
                            float: 'right',
                        }}
                    />
                </Map>
            </YMaps>
        </div>
    );
};

export default MapY;
