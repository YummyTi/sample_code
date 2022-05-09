// @ts-nocheck
import './styles.css';

import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {Map, Polygon, YMaps} from 'react-yandex-maps';

const polygon = [
    [
        [55.75, 37.5],
        [55.75, 37.7],
        [55.7, 37.7],
        [55.7, 37.5],
    ],
];

const mapState = {
    center: [55.725, 37.6],
    zoom: 10,
};

const PolygonMap = () => {
    const firstRef = useRef<any>(null);
    const secondRef = useRef<any>(null);
    const thirdRef = useRef<any>(null);
    const mapRef = useRef<any>(null);
    const [firstReady, setFirstReady] = useState(false);
    const [secondReady, setSecondReady] = useState(false);
    const [thirdReady, setThirdReady] = useState(false);

    const draw = () => {
        secondRef.current.editor.startDrawing();
        let previusCoords: any;
        secondRef.current.editor.events.add('beforevertexadd', (event: any) => {
            console.log(previusCoords);
            const projection = mapRef.current.options.get('projection');
            const coords = projection.fromGlobalPixels(
                event.get('globalPixels'),
                mapRef.current.getZoom(),
            );
            console.log(coords, 'coordinates');
            // console.log(inside(coords, polygon));
            // if (!inside(coords, polygon)) {
            // previusCoords = undefined;
            // event.preventDefault();
            // return;
            // }
            previusCoords = coords;
        });
        secondRef.current.editor.events.add('drawingstop', () => {
            secondRef.current.editor.stopEditing();
        });
    };

    const drawSecond = () => {
        if (secondReady && firstReady) {
            thirdRef.current.editor.startDrawing();
            let previusCoords: any;
            thirdRef.current.editor.events.add(
                'beforevertexadd',
                (event: any) => {
                    console.log(previusCoords);
                    const projection = mapRef.current.options.get('projection');
                    const coords = projection.fromGlobalPixels(
                        event.get('globalPixels'),
                        mapRef.current.getZoom(),
                    );
                    console.log(coords, 'coordinates');
                    // console.log(inside(coords, polygon));
                    // if (!inside(coords, polygon)) {
                    // previusCoords = undefined;
                    // event.preventDefault();
                    // return;
                    // }
                    previusCoords = coords;
                },
            );
            thirdRef.current.editor.events.add('drawingstop', () => {
                thirdRef.current.editor.stopEditing();
            });
        }
    };

    useEffect(() => {
        secondReady && firstReady && draw();
    }, [firstReady, secondReady]);

    useEffect(() => {
        secondReady && firstReady && thirdReady && drawSecond();
    }, [firstReady, secondReady, thirdReady]);

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <YMaps>
                <Map
                    instanceRef={(map) => (mapRef.current = map)}
                    defaultState={mapState}
                    modules={['geoObject.addon.editor']}
                >
                    <Polygon
                        instanceRef={(ref: any) =>
                            (firstRef.current = ref) && setFirstReady(true)
                        }
                        geometry={polygon}
                        options={{
                            editorDrawingCursor: 'crosshair',
                            editorMaxPoints: 5,

                            fillColor: '#00FF00',
                            // Цвет обводки.
                            strokeColor: '#0000FF',
                            // Ширина обводки.
                            strokeWidth: 5,
                        }}
                    ></Polygon>
                    <Polygon
                        instanceRef={(ref: any) =>
                            (secondRef.current = ref) && setSecondReady(true)
                        }
                        geometry={[]}
                        options={{
                            editorDrawingCursor: 'crosshair',
                            editorMaxPoints: 10,

                            fillColor: 'rgba(0, 0, 0, 0.4)',
                            // Цвет обводки.
                            strokeColor: '#000000',
                            // Ширина обводки.
                            strokeWidth: 5,
                        }}
                    />

                    <Polygon
                        instanceRef={(ref: any) =>
                            (thirdRef.current = ref) && setThirdReady(true)
                        }
                        geometry={[]}
                        options={{
                            editorDrawingCursor: 'crosshair',
                            editorMaxPoints: 10,

                            fillColor: 'rgba(0, 0, 0, 0.4)',
                            // Цвет обводки.
                            strokeColor: '#000000',
                            // Ширина обводки.
                            strokeWidth: 5,
                        }}
                    />
                </Map>
            </YMaps>

            <button onClick={drawSecond}>Draw</button>
        </div>
    );
};

export default PolygonMap;
