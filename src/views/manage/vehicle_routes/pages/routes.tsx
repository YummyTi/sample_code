import React from 'react';
import shallow from 'zustand/shallow';

import {useEditRouteStore} from '@src/shared/store/edit_route';

import Details from './Details';
import Etalon from './Etalon';
import Passport from './Passport';
import Protocol from './Protocol';
import Schedule from './Schedule';
import Scheme from './Scheme';

const EditRoutes = () => {
    const {tab} = useEditRouteStore((state) => ({...state}), shallow);
    switch (tab) {
        case '1':
            return <Passport />;
        case '2':
            return <Etalon />;
        case '3':
            return <Scheme />;
        // case '4':
        //     return <Details />;
        case '4':
            return <Protocol />;
        case '5':
            return <Schedule />;
        default:
            return <Passport />;
    }
};

export default EditRoutes;
