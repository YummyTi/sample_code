export interface IBus {
    busid: string;
    gosno: string;
    marshrutid: number | string;
}

export interface IBusStops {
    bus: IBus;
    gpsstatus: string;
    isline: string | number;
    loc: any;
    speed: number;
    stat_id: any;
    stat_name: any;
    systemtime: string;
    trackerid: string;
}
