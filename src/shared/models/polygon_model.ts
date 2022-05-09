export interface PolygonSaveModel {
    id: any;
    // name: string;
    color: string;
    coordinates: Coordinate[];
}

export interface Coordinate {
    lat: number;
    lng: number;
}

export interface IPolygonModel {
    name: string;
    coordinates: any;
    type: string;
    routes: string;
    color: any;
    completed: boolean;
    id: string;
    lastChanged: null;
    kppStation: KppStation;
    lastUser: KppStation;
}

export interface KppStation {
    id: number;
    name: string;
}
