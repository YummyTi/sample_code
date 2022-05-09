export interface RouteExchangeModel {
    graph_id: null;
    gos: string;
    model: string;
    even: number;
    race: number;
    from_time: string;
    to_time: string;
    station: string;
    tab_number: string;
    driver_name: string;
    tab_num_con: null;
    conductor_name: null;
    created: number;
    user_name: string;
    id: number;
    ex_id: number | undefined | null;
}

export interface RouteExchangeOrder {
    id: number;
    g: string;
    vianum: string;
    model: string;
}
