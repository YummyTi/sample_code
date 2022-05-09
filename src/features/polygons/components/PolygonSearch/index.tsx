import React from 'react';
import shallow from 'zustand/shallow';

import usePolygonSearch from '@src/shared/api/polygon/usePolygonSearch';
import SearchComponent from '@src/shared/components/SearchComponent';
import {usePolygonStore} from '@src/shared/store/polygon';

import styles from './index.module.scss';

const PolygonSearch = () => {
    const {isLoading, list} = usePolygonSearch();
    const {routeType, routeName, setRouteName, setRouteType, handlePolygon} =
        usePolygonStore((state) => ({...state}), shallow);

    const handleSearch = (e: any) => {
        setRouteName(e.target.value);
    };

    const handleActive = (value: number) => {
        setRouteType(value);
    };

    const handleItem = (item: any) => {
        handlePolygon(item);
    };

    return (
        <div className={styles.wrapper}>
            <SearchComponent
                value={routeName}
                handleChange={handleSearch}
                activeSide={routeType}
                handleActive={handleActive}
                isLoading={isLoading}
                handleItem={handleItem}
                options={
                    list?.length > 0 &&
                    list?.map((item) => ({
                        id: item.id,
                        label: item.name,
                    }))
                }
                firstText="marshrut"
                secondText="title"
                styles={null}
            />
        </div>
    );
};

export default PolygonSearch;
