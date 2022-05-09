export interface IRoleModel {
    id: number;
    name: string;
    remark: string;
    deleted: boolean;
    permissionKeys: string[];
}
export interface IRoleModelState {
    id: null | number;
    name: string;
    remark: string;
}

export interface IPermit {
    url: string;
    permission: null | number;
}

export interface RoleModel {
    id: number;
    name: string;
    permissions: IPermit[];
    remark: string;
}
