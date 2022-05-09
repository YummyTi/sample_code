// Side effect
// useEffect(() => {
//     if (polyLines?.length && !addEffect) {
//         console.log('update', addEffect);
//         if (polyLines?.length > 0) {
//             setPolygons(polyLines);
//         }

//         setTimeout(() => {
//             setPolyLines([]);
//             setCoords([]);
//         }, 10000);
//         setAddEffect(true);
//     }
// }, [polyLines.length, addEffect]);

// onLoad={(e) => {
//     // Run this function when ruler will be ready
//     // This is init ruler state https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/behavior.Ruler.html#method_detail__setState
//     const state =
//         '37.57660258,55.69576899~-0.01098633,0.09605884~0.12634277,0.00309472';

//     if (map.current) {
//         map.current.behaviors.get('ruler').setState(state);
//     }
// }}

// const onMapClick = (event: any) => {
//     const cordinate: any = event.get('coords');
//     setAddEffect(true);
//     if (lastCordinate?.lat) {
//         const findedIndex = coords.findIndex(
//             (item: any) => item.id === lastCordinate.id,
//         );

//         // Coordinates
//         coords.splice(findedIndex, 0, {
//             lat: cordinate[0],
//             lng: cordinate[1],
//             id: uuid(),
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
//             {lat: cordinate[0], lng: cordinate[1], id: uuid()},
//         ]);
//         const insertedPolygon = [...polygon, cordinate];
//         setPolygon(insertedPolygon);

//         setPolyLines([...polyLines, cordinate]);
//     }
// };

// const mapRef = useRef<any>(null);
// const [polygon, setPolygon] = useState<any>([]);
// const [addEffect, setAddEffect] = useState<boolean>(false);

// {coords.map((coordsMain: any) => {
//     return (
//         <Placemark
//             key={coordsMain.id}
//             geometry={[coordsMain.lat, coordsMain.lng]}
//             onClick={() => {
//                 setLastCordinate(coordsMain);
//             }}
//             options={{
//                 preset: 'islands#violetIcon',
//                 iconLayout: 'default#image',
//                 iconImageHref: iconMarker,
//             }}
//             onContextMenu={() => handleContext(coordsMain)}
//         />
//     );
// })}

// const handleContext = (crds: any) => {
//     setCoords(coords.filter((item: any) => item.id !== crds.id));
//     setPolyLines(
//         polyLines.filter(
//             (item: any) => item[0] !== crds.lat && item[1] !== crds.lng,
//         ),
//     );
// };
