import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useIsFetching} from 'react-query';

import usePolygon from '@api/polygon/hooks';
import PolygonData from '@features/polygons/components/PolygonData';

const PolygonsPage = () => {
    const {isLoading} = usePolygon();
    const {t} = useTranslation();
    const fetching = useIsFetching(['polygons']);

    return (
        <div className="main__container">
            <div className="header">
                <div className="headerContainer">
                    <h3 className="headerText">{t('final_station')}</h3>
                    {fetching !== 0 && <CircularProgress size={20} />}
                </div>
            </div>
            {isLoading && !fetching ? (
                <div className="center__file" style={{paddingTop: '30px'}}>
                    <CircularProgress />
                </div>
            ) : (
                <PolygonData />
            )}
        </div>
    );
};

export default PolygonsPage;
