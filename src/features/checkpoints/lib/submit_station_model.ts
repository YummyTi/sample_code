import {Options} from '@models/options_model';
import {IStation} from '@models/station_model';

export interface ISubmitStation extends Omit<IStation, 'station_type'> {
    routesInputs: {route: string}[];
    station_type: Options;
}
