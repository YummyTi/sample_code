import create, {SetState} from 'zustand';

import {IGarage} from '@shared/models/garage_model';

interface IGarages {
    garages: IGarage[];
    setGarages: (payload: IGarage[]) => void;
}

export const useGaragesStore = create<IGarages>((set: SetState<IGarages>) => ({
    garages: [],
    setGarages: (payload): void => {
        set({garages: payload});
    },
}));
