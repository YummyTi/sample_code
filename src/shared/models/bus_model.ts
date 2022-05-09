export interface IBusModelJSON {
    id: number;
    name: string;
    remark: string;
    fuelType: null;
    lastUser: string;
    lastChanged: string;
}

export interface ISaveBusModel {
    id: number | null;
    name: string;
    remark: string;
    type_of_fuel: number;
}

export interface IUpdateBusModel {
    id?: number | null;
    name: string;
    remark: string;
    type_of_fuel?: number;
}
