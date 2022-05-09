// Drawing Map

// const firstRef = useRef<any>(null);
// const secondRef = useRef<any>(null);
// const mapRef = useRef<any>(null);
// const [firstReady, setFirstReady] = useState(false);
// const [secondReady, setSecondReady] = useState(false);

// const draw = () => {
//     if (open) {
//         console.log('drawing START');
//         secondRef.current.editor.startDrawing();
//         let previusCoords: any;
//         secondRef.current.editor.events.add(
//             'beforevertexadd',
//             (event: any) => {
//                 console.log(previusCoords);
//                 const projection = mapRef.current.options.get('projection');
//                 const coords = projection.fromGlobalPixels(
//                     event.get('globalPixels'),
//                     mapRef.current.getZoom(),
//                 );
//                 console.log(coords, 'coordinates');
//                 // console.log(inside(coords, polygon));
//                 // if (!inside(coords, polygon)) {
//                 // previusCoords = undefined;
//                 // event.preventDefault();
//                 // return;
//                 // }
//                 previusCoords = coords;
//             },
//         );
//         secondRef.current.editor.events.add('drawingstop', () => {
//             secondRef.current.editor.stopEditing();
//         });
//     }
// };

// useEffect(() => {
//     open && secondReady && firstReady && draw();
// }, [firstReady, secondReady, open]);

// useEffect(() => {
//     secondReady && firstReady && thirdReady && drawSecond();
// }, [firstReady, secondReady, thirdReady]);
// Drawing map
