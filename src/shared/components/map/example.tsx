// KReeD, [18.01.2022 11:16]
// import React from 'react';
// import {
//     Clusterer,
//     FullscreenControl,
//     ListBox,
//     ListBoxItem,
//     Map,
//     Placemark,
//     Polyline,
//     RouteEditor,
//     TrafficControl,
//     TypeSelector,
//     YMaps,
//     ZoomControl
// } from "react-yandex-maps";
// import bus from "../assets/images/user/bus.png";
// import busStop from "../assets/images/user/bus-stop.svg";
// import myLocation from "../assets/images/user/myLocation.svg";
// import {getLocations} from "../redux/CarsInfo/carsInfoAction";
// import {useDispatch, useSelector} from "react-redux";

// const YandexMap = ({loading = true, error, dataBus, dataStation, mapShowType, setMapShowType, userLocation}) => {
//     const dispatch = useDispatch();

//     const routePointsData = useSelector(state => state.routeReducer.routePointsData);
//     const props = React.useRef(null);

//     React.useEffect(() => {
//         if (mapShowType === "BUS") {
//             props.current = setInterval(() => dispatch(getLocations()), 1000);
//         }
//         return () => clearInterval(props.current);
//     }, [dispatch, mapShowType]);

//     let defaultCenter = [41.317046, 69.253126];

//     const PolylineControl = ({data}) => {
//         if (data.length > 0) {
//             const index = ~~(data.length / 2);
//             defaultCenter = data[index];
//             return (
//                 <Polyline
//                     geometry={data}
//                     options={{
//                         balloonCloseButton: false,
//                         strokeColor: '#0059ff',
//                         strokeWidth: 4,
//                         strokeOpacity: 0.5,
//                     }}
//                 />
//             );
//         }
//         return null;
//     }
//     return (
//         <YMaps query={{lang: 'ru_RU'}}>
//             <Map width="100%" height="600px"
//                  disabled={true} options={{restrictMapArea: !!(loading || error)}}
//                  defaultState={{center: defaultCenter, zoom: 12}}>
//                 <ListBox data={{content: 'Select city'}}>
//                     <ListBoxItem data={{content: 'Bus'}}
//                                  onClick={() => setMapShowType(mapShowType !== "BUS" ? "BUS" : '')}/>
//                     <ListBoxItem data={{content: 'Stations'}}
//                                  onClick={() => setMapShowType(mapShowType !== "STATION" ? "STATION" : '')}/>
//                 </ListBox>
//                 <ZoomControl options={{float: 'right'}}/>
//                 <FullscreenControl/>
//                 <RouteEditor/>
//                 <TypeSelector options={{float: 'right'}}/>
//                 <TrafficControl options={{float: 'right'}}/>
//                 <PolylineControl data={routePointsData}/>
//                 {Array.from(Array(~~(dataBus?.length / 100) + 1), (e, i) => {
//                         const a = i++;
//                         const b = a * 100;
//                         return (
//                             <div key={i}>
//                                 {mapShowType === "BUS" && dataBus && dataBus.length > 0 ? dataBus.slice(b, b + 100).map((item, index) =>
//                                     <Placemark
//                                         options={{
//                                             iconImageHref: bus,
//                                             iconContentOffset: [15, 15],
//                                             iconLayout: 'default#image',
//                                             iconColor: '#00ff17'
//                                         }}
//                                         key={index++}
//                                         properties={{
//                                             balloonContent: 'Содержимое балуна',
//                                             clusterCaption: 'Еще одна метка',
//                                             hintContent: 'Текст подсказки'
//                                         }}
//                                         geometry={[item.loc.coordinates[1], item.loc.coordinates[0]]}
//                                     />
//                                 ) : null}
//                             </div>
//                         )
//                     }
//                 )}

//                 <Clusterer
//                     options={{
//                         // preset: 'islands#invertedLightBlueClusterIcons',
//                         // preset: 'islands#invertedVioletClusterIcons',
//                         preset: 'islands#invertedDarkOrangeClusterIcons',
//                         groupByCoordinates: false,
//                     }}
//                 >

//                     {Array.from(Array(~~(dataStation?.length / 100) + 1), (e, i) => {
//                         const a = i++;
//                         const b = a * 100;
//                         return (
//                             <div key={i}>
//                                 {mapShowType === "STATION" && dataStation && dataStation.length > 0 ? dataStation.slice(b, b + 100).map((item, index) =>
//                                     <Placemark
//                                         modules={['geoObject.addon.balloon']}
//                                         key={index++}
//                                         geometry={[item.lat, item.lng]}
//                                         properties={{
//                                             balloonContentBody: item.name,
//                                         }}
//                                         options={{
//                                             iconImageHref: busStop,
//                                             iconContentOffset: [15, 15],
//                                             iconLayout: 'default#image'
//                                         }}
//                                     />
//                                 ) : null}
//                             </div>
//                         );
//                     })}

//                     {/*                    {mapShowType === "STATION" && dataStation && dataStation.length > 0 ? dataStation.map((item, index) =>
//                         <Placemark
//                             modules={['geoObject.addon.balloon']}
//                             key={index++}
//                             geometry={[item.lat, item.lng]}
//                             properties={{
//                                 balloonContentBody: item.name,
//                             }}
//                             options={{
//                                 iconImageHref: busStop,
//                                 iconContentOffset: [15, 15],
//                                 iconLayout: 'default#image'
//                             }}
//                         />
//                     ) : null}*/}
//                 </Clusterer>
//                 {!userLocation.error && userLocation.latitude && userLocation.longitude &&
//                 <Placemark
//                     modules={['geoObject.addon.balloon']}
//                     geometry={[userLocation.latitude, userLocation.longitude]}
//                     properties={{
//                         balloonContentBody: 'your location',
//                     }}
//                     options={{
//                         iconImageHref: myLocation,
//                         iconContentOffset: [15, 15],
//                         iconLayout: 'default#image'
//                     }}
//                 />
//                 }
//             </Map>
//         </YMaps>
//     );
// };

// export default YandexMap;
