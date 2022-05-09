import React from 'react';
import shallow from 'zustand/shallow';

import {SideBar} from '@components/SideBar';
import MapY from '@features/edit_polygon/components/MapY';
import RightSide from '@features/edit_polygon/components/RightSide';
import {helper} from '@shared/helpers';
import {usePolygonStore} from '@store/polygon';

import styles from './index.module.scss';

const {hexToRGBA} = helper;

const EditPolygon = () => {
    const {openSide} = usePolygonStore((state) => ({...state}), shallow);

    const outSideClick = () => {
        const white = hexToRGBA('#eeeeee', '0.5');
        console.log('white', white);
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

export default EditPolygon;
