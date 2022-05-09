// const handleDragStart = (crds: any) => {
//     // setCoords(coords.filter((item: any) => item.lat !== crds[0]));
//     const foundObj = coords.find(
//         (item: any) => item.lat === crds[0] && item.lng === crds[1],
//     );
//     const findIndex = coords.findIndex(
//         (item: any) => item.lat === crds[0] && item.lng === crds[1],
//     );
//     setFIndex(findIndex);
//     setDragObj(foundObj);
//     setDragLast(crds);
// };

// // console.log(dragLast, 'drag last');
// const handleDragEnd = (crds: any) => {
//     setCoords([
//         ...coords.slice(0, fIndex),
//         {
//             ...dragObj,
//             lat: crds[0],
//             lng: crds[1],
//             uniqeId: dragObj.uniqeId,
//         },
//         ...coords.slice(fIndex + 1),
//     ]);
//     setPolyLines([
//         ...coords.slice(0, fIndex).map((item: any) => [item.lat, item.lng]),
//         [crds],
//         ...coords
//             .slice(fIndex + 1)
//             .map((item: any) => [item.lat, item.lng]),
//     ]);
// };

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

// /* <ObjectManager
//                 options={{
//                     clusterize: false,
//                     gridSize: 150,
//                 }}
//                 features={dataConvert(coords)}
//             /> */

// /* <Polyline
//                 geometry={polyLines}
//                 options={{
//                     balloonCloseButton: false,
//                     strokeColor: '#0b48ca',
//                     strokeWidth: 4,
//                     strokeOpacity: 0.5,
//                 }}
//             /> */

// onLoad={(e) => {
//     // Run this function when ruler will be ready
//     // This is init ruler state https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/behavior.Ruler.html#method_detail__setState
//     // const state =
//     //     '69.24298268717716,41.32847446609404~0.009999999999990905,-0.010000000000005116~-0.030000000000015348,0.011000000000002785~-0.009999999999948272,0.0020000000000024443';
//     const state = locatioParser(coords);
//     console.log(state, 'state locations');
// if (map.current) {
//     map.current.behaviors.get('ruler').setState(state);
// }
// }}

// const handleContext = (crds: any) => {
//     setCoords(coords.filter((item: any) => item.uniqeId !== crds.uniqeId));
//     setPolyLines(
//         polyLines.filter(
//             (item: any) => item[0] !== crds.lat && item[1] !== crds.lng,
//         ),
//     );
// };
