export const permissionObj: IPermissionModel | any = {
    automobile: [],
    transports: [],
    vehicle_model: [],
    routes: [],
    checkpoints: [],
    polygons: [],
    order: [],
    races_fuel: [],
    main: [],
    statistic: [],
    logs: [],
    roles: [],
    region: [],
};

export interface IPermissionModel {
    automobile: number[];
    transports: number[];
    vehicle_model: number[];
    routes: number[];
    checkpoints: number[];
    polygons: number[];
    order: number[];
    races_fuel: number[];
    main: number[];
    statistic: number[];
    logs: number[];
    roles: number[];
    region: number[];
}
