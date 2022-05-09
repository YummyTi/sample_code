import React, {Component} from 'react';
import {QueryClientProvider} from 'react-query';

import {queryClient} from '@shared/helpers/constants';

const withReactquery = (component: Component) => () =>
    (
        <QueryClientProvider client={queryClient}>
            {/*@ts-ignore */}
            {component()}
        </QueryClientProvider>
    );

export default withReactquery;
