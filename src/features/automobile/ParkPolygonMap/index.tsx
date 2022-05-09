import React, {useEffect, useRef, useState} from 'react';
import {
    FullscreenControl,
    Map,
    Polygon,
    RulerControl,
    YMaps,
    ZoomControl,
} from 'react-yandex-maps';
import shallow from 'zustand/shallow';

import {useAutomobileStore} from '@src/shared/store/automobile';

import {constants} from '@shared/helpers';

const {tashkentzoom, yQuery} = constants;

interface IProps {
    data?: any;
}

const mapState = {
    center: tashkentzoom,
    zoom: 12,
    behaviors: ['default', 'scrollZoom'],
    controls: [],
};

const ParkPolygonMap = ({data}: IProps) => {
    const map = useRef<any>(null);
    const {polyLines, polygons, setPolygons, removePolygon} =
        useAutomobileStore((state) => ({...state}), shallow);

    const [open, setOpen] = useState<boolean>(false);

    const removePolygons = (index: number) => {
        removePolygon(index);
    };

    const handleUp = () => {
        const latLngs = map?.current?.behaviors
            .get('ruler')
            .geometry.getCoordinates();

        if (latLngs?.length > 1) {
            setPolygons(latLngs);
            map.current.behaviors.get('ruler').setState('');
        }
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            handleUp();
        }
    }, [open]);

    console.log(polygons, 'polygons');

    return (
        <YMaps query={yQuery}>
            <Map
                style={{width: '100%', height: '100%'}}
                defaultState={mapState}
                //@ts-ignore
                instanceRef={map}
                // onClick={onMapClick}
                modules={['multiRouter.MultiRoute']}
                options={{
                    maxZoom: 20,
                }}
            >
                {/* <Polygon
                    geometry={[polyLines]}
                    options={{
                        editorDrawingCursor: 'crosshair',
                        editorMaxPoints: 5,

                        fillColor: 'rgba(37, 36, 36, 0.4)',
                        // Цвет обводки.
                        strokeColor: 'rgba(0, 0, 0, 0.5)',
                        // Ширина обводки.
                        strokeWidth: 5,
                    }}
                /> */}

                {/* polygons list  */}

                {polygons?.length > 0 &&
                    polygons?.map((item: any, index: number) => {
                        return (
                            <Polygon
                                key={index}
                                geometry={[item]}
                                options={{
                                    editorDrawingCursor: 'crosshair',
                                    editorMaxPoints: 5,

                                    fillColor: 'rgba(37, 36, 36, 0.4)',
                                    // Цвет обводки.
                                    strokeColor: 'rgba(0, 0, 0, 0.5)',
                                    // Ширина обводки.
                                    strokeWidth: 5,
                                }}
                                onContextMenu={() => removePolygons(index)}
                            />
                        );
                    })}
                {/* polygons list end  */}
                <FullscreenControl />
                <RulerControl
                    onClick={() => {
                        if (open) {
                            setOpen(false);
                        } else {
                            setOpen(true);
                        }
                    }}
                    options={{float: 'right'}}
                />

                <ZoomControl options={{float: 'right'}} />
            </Map>
        </YMaps>
    );
};

export default React.memo(ParkPolygonMap);
