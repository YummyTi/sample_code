export interface IPermit {
    id: number;
    name: string;
    login: string;
    lang: string;
    front_urls: IFrontUrl[];
    remark: string;
    active: boolean;
    region: any;
    roleName: string;
    permissions: string[];
}

interface IFrontUrl {
    url: string;
    permission: null | number;
}
