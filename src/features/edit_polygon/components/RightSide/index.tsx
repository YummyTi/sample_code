import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import React, {useState} from 'react';
import {RgbaColorPicker} from 'react-colorful';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';
import shallow from 'zustand/shallow';

import ExitCloseIcon from '@src/images/svgs/ExitCloseIcon';
import usePolygonMutate from '@src/shared/api/polygon/mutation';
import {IPolygonModel} from '@src/shared/models/polygon_model';
import {usePolygonStore} from '@src/shared/store/polygon';

import styles from './index.module.scss';

interface LocationState {
    state: IPolygonModel;
}

const RightSide = () => {
    const {t} = useTranslation();
    const location = useLocation();
    const query = location as LocationState;
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const {setOpenSide, fillColor, color, setColor, polygon} = usePolygonStore(
        (state) => ({...state}),
        shallow,
    );
    const {handleSave} = usePolygonMutate();

    const handleClose = () => {
        setOpenSide(false);
    };

    const handleHide = () => {
        setDisplayColorPicker(false);
    };

    const handleClick = () => {
        setDisplayColorPicker(true);
    };

    const handleSavePolygon = () => {
        handleSave.mutate({
            id: query.state?.id,
            color: fillColor,
            coordinates: polygon.map((coordinate: any) => ({
                lat: coordinate[0],
                lng: coordinate[1],
            })),
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.topSide}>
                <div className={styles.header}>
                    <h3>{t('add_polygon')}</h3>
                    <IconButton onClick={handleClose}>
                        <ExitCloseIcon />
                    </IconButton>
                </div>
                <div className={styles.body}>
                    <div className={styles.row}>
                        <p>{t('color')}</p>
                        <Button className="btn__primary" onClick={handleClick}>
                            {t('choose_color')}
                        </Button>

                        {displayColorPicker ? (
                            <div className={styles.cover}>
                                <div
                                    className={styles.popper}
                                    onClick={handleHide}
                                />
                                <RgbaColorPicker
                                    color={color}
                                    onChange={setColor}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className={styles.bottomSide}>
                <Button
                    fullWidth
                    onClick={handleSavePolygon}
                    disabled={handleSave.isLoading}
                    className="btn__primary"
                >
                    {handleSave.isLoading ? (
                        <CircularProgress color="inherit" size={25} />
                    ) : (
                        t('save')
                    )}
                </Button>
            </div>
        </div>
    );
};

export default RightSide;
