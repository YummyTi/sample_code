import {useMutation} from 'react-query';

import {IStationSave} from '@models/station_model';

import {postStation, removeStation} from '.';

export const useSaveStation = () => {
    const saveStation = useMutation((data: IStationSave) => postStation(data));
    return saveStation;
};

export const useDeleteStation = () => {
    const deleteStation = useMutation((data: any) => removeStation(data));
    return deleteStation;
};
