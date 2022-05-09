export interface IUser {
    id: number | string | null;
    fullname: string;
    login: string;
    password: string | number;
    roleId: number;
    regionId: number;
    parkList: number[] | any;
    remark: string;
    isActivated: string | boolean;
}

export interface IUserUpdate {
    id: number | string | null;
    fullname: string;
    login: string;
    password: string | number;
    confirmPassword: string | number;
    roleId: number;
    parkList: number[] | any;
    regionId: number;
    remark: string;
    isActivated: string | boolean;
}

export interface IUserModel {
    deleted: boolean;
    fullname: string;
    is_activated: boolean;
    login: string;
    region: IRegionModel;
    remark: string;
    role_id: number;
    user_id: number;
}

export interface UserModel {
    id: number;
    fullname: string;
    login: string;
    region: Region;
    role: Role;
    remark: string;
    is_activated: boolean;
}

export interface Region {
    id: number;
    name: string;
}

export interface Role {
    id: number;
    name: string;
    remark: string;
}

export interface IUserModel {
    fullname: string;
    is_activated: boolean;
    login: string;
    region: IRegionModel;
    remark: string;
    role_id: number;
    user_id: number;
}

export interface IRegionModel {
    id: number;
    name: string | null;
    deleted: boolean;
}
