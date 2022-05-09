import create, {GetState, SetState} from 'zustand';

interface IAutomobile {
    automobileList: any[];
    setAutomobileList: (payload: any[]) => void;
    polyLines: any[];
    setPolyLines: (payload: any[]) => void;
    polygons: any[];
    setPolygons: (payload: any[]) => void;
    setNewPolygons: (payload: any[]) => void;
    polygonCoords: any[];
    setPolygonCoords: (payload: any[]) => void;
    removePolygon: (payload: number) => void;
    clearPolygons: () => void;
}

export const useAutomobileStore = create<IAutomobile>(
    (set: SetState<IAutomobile>, get: GetState<IAutomobile>) => ({
        automobileList: [],
        polyLines: [],
        polygons: [],
        polygonCoords: [],
        setPolygonCoords: (payload) => {
            set(({polygonCoords}) => ({
                polygonCoords: [...polygonCoords, payload],
            }));
        },
        setPolygons: (payload) => {
            set(({polygons}) => ({polygons: [...polygons, payload]}));
        },
        setNewPolygons: (payload) => {
            set({polygons: payload});
        },
        clearPolygons: () => {
            set(() => ({polygons: []}));
        },
        removePolygon: (id) => {
            set(({polygons}) => ({
                polygons: polygons.filter(
                    (item: any, index: number) => index !== id,
                ),
            }));
        },
        setPolyLines: (payload: any[]) => {
            set({polyLines: payload});
        },
        setAutomobileList: (payload): void => {
            set({automobileList: payload});
        },
    }),
);
