export interface IFuelType {
    id: number;
    name: string;
    remark: string;
    lastChanged: string;
    lastUser: number;
}

export interface ISaveFuelType {
    id: number | null;
    name: string;
    remark: string;
}
