import React from 'react';

import PolygonSearch from '../PolygonSearch';
import PolygonTable from '../PolygonTable';
import styles from './index.module.scss';

const PolygonData = () => {
    return (
        <div className={styles.container}>
            <PolygonTable />
            <PolygonSearch />
        </div>
    );
};

export default PolygonData;
