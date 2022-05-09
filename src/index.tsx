import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';

import '@styles/styles.css';
import '@styles/styles.less';
import '@styles/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {ErrorBoundary} from 'react-error-boundary';
import {ToastContainer} from 'react-toastify';

import App from '@src/app/app';

const ErrorFallback = ({error}: any) => {
    console.log(error, 'error boundary');
    return <div>Error</div>;
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
        <ToastContainer limit={2} />
    </ErrorBoundary>,
);
