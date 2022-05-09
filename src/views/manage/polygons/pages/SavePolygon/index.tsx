import React from 'react';
import shallow from 'zustand/shallow';

import {SideBar} from '@components/SideBar';
import MapY from '@features/save_polygon/components/MapY';
import RightSide from '@features/save_polygon/components/RightSide';
import {usePolygonStore} from '@store/polygon';

import styles from './index.module.scss';

const SavePolygon = () => {
    const {openSide} = usePolygonStore((state) => ({...state}), shallow);

    const outSideClick = () => {
        console.log('out');
    };

    return (
        <div className={styles.container}>
            <MapY />
            <SideBar
                topInner
                maxWidth="450px"
                onOutSideClick={outSideClick}
                isOpen={openSide}
            >
                <RightSide />
            </SideBar>
        </div>
    );
};

export default SavePolygon;
