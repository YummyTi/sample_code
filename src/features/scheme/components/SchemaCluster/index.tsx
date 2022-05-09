import React from 'react';
import {Clusterer, Placemark} from 'react-yandex-maps';
import shallow from 'zustand/shallow';

import {constants, locationParser} from '@shared/helpers';
import {useStationsStore} from '@store/station';

interface IProps {
    setLastCordinate: (payload: any) => void;
}

const {MAP_ICON} = constants;

const SchemaCluster = ({setLastCordinate}: IProps) => {
    const [fIndex, setFIndex] = React.useState<any>(null);

    // const map = useRef<any>();
    const {
        stations,
        coords,
        polyLines,
        setCoords,
        setPolyLines,
        dragLast,
        setDragLast,
        dragObj,
        setDragObj,
    } = useStationsStore((state) => ({...state}), shallow);

    const handleContext = (crds: any) => {
        setCoords(coords.filter((item: any) => item.uniqeId !== crds.uniqeId));
        setPolyLines(
            polyLines.filter(
                (item: any) => item[0] !== crds.lat && item[1] !== crds.lng,
            ),
        );
    };

    const handleDragStart = (crds: any) => {
        // setCoords(coords.filter((item: any) => item.lat !== crds[0]));
        const foundObj = coords.find(
            (item: any) => item.lat === crds[0] && item.lng === crds[1],
        );
        const findIndex = coords.findIndex(
            (item: any) => item.lat === crds[0] && item.lng === crds[1],
        );
        setFIndex(findIndex);
        setDragObj(foundObj);
        setDragLast(crds);
    };

    // console.log(dragLast, 'drag last');
    const handleDragEnd = (crds: any) => {
        setCoords([
            ...coords.slice(0, fIndex),
            {
                ...dragObj,
                lat: crds[0],
                lng: crds[1],
                uniqeId: dragObj.uniqeId,
            },
            ...coords.slice(fIndex + 1),
        ]);
        setPolyLines([
            ...coords.slice(0, fIndex).map((item: any) => [item.lat, item.lng]),
            [crds],
            ...coords
                .slice(fIndex + 1)
                .map((item: any) => [item.lat, item.lng]),
        ]);
    };

    return (
        <Clusterer
            options={{
                preset: 'islands#invertedVioletClusterIcons',
                groupByCoordinates: false,
            }}
        >
            {coords.map((coordsMain: any) => {
                return (
                    <Placemark
                        key={coordsMain.uniqeId}
                        geometry={[coordsMain.lat, coordsMain.lng]}
                        onClick={() => {
                            setLastCordinate(coordsMain);
                        }}
                        onContextMenu={() => handleContext(coordsMain)}
                        options={{
                            iconLayout: 'default#image',
                            iconImageSize: [25, 35],
                            iconImageHref: coordsMain?.station
                                ? MAP_ICON.STATION
                                : MAP_ICON.POINT,
                            draggable: true,
                        }}
                        onDragStart={(e: any) =>
                            handleDragStart(
                                e.get('target').geometry.getCoordinates(),
                            )
                        }
                        onDragEnd={(e: any) =>
                            handleDragEnd(
                                e.get('target').geometry.getCoordinates(),
                            )
                        }
                        // events={{
                        //     dragend: {
                        //         function(event: any) {
                        //             console.log(
                        //                 'function worket' +
                        //                     event
                        //                         .get('target')
                        //                         .geometry.getCoordinates(),
                        //             );
                        //         },
                        //     },
                        // }}
                    />
                );
            })}
        </Clusterer>
    );
};

export default SchemaCluster;
