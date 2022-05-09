import React from 'react';
import {BrowserRouter} from 'react-router-dom';

const withRouter = (component: () => React.ReactElement) => () =>
    <BrowserRouter>{component()}</BrowserRouter>;
export default withRouter;
