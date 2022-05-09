export interface IParkModel {
    id: number;
    garage_name: string;
    license_number: string;
    remark: string;
    park: string;
    park_id: number;
}

export interface IParkModelResponse {
    id: number;
    garage_name: string;
    license_number: string;
    remark: string;
    park: string;
    park_id: number;
}

export interface IAddParkModel {
    id?: number;
    license_name: string;
    short_name: string;
    license_number: string;
    license_expire_date: string;
    remark: string;
    region_id?: any;
    garage_list: GarageList[];
}

export interface IUpdateParkModel {
    name: string;
    license_number: string;
    garage_name: string;
    remark: string;
}

export interface GarageList {
    garage_name: any;
    lat: any;
    lng: any;
    radius: number;
    garage_remark: any;
}

export interface ISingleparkModel {
    garage_name: string;
    garage_remark: string;
    last_date: string;
    lat: string;
    license_expire_date: Date;
    lng: string;
    park_license_num: string;
    park_name: string;
    park: string;
    park_remark: string;
    radius: string;
    short_name: string;
}

export interface IGarageModel {
    coords: any;
    name: string;
    park_id: number[];
    type: string;
}
