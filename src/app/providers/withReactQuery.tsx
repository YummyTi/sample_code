import React from 'react';
import {QueryClientProvider} from 'react-query';

import {queryClient} from '@shared/helpers/constants';

const withReactquery = (component: () => React.ReactElement) => () =>
    (
        <QueryClientProvider client={queryClient}>
            {component()}
        </QueryClientProvider>
    );

export default withReactquery;
