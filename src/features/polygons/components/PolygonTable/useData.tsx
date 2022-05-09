import Edit from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import c from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import shallow from 'zustand/shallow';

import {helper} from '@shared/helpers';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {usePolygonStore} from '@store/polygon';

import VisibleIcon from '@images/svgs/VisibleIcon';

const {hexToRGBA, parsedColorText, rgbaParse, stringToRgba} = helper;

const useData = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {canEdit, canDelete} = useLocationPermission();

    const {setColor, setOpenSide} = usePolygonStore(
        (state) => ({...state}),
        shallow,
    );

    const columns: any = React.useMemo(
        () => [
            {
                Header: t('graphic'),
                accessor: 'name',
                Cell: (params: any) => {
                    return (
                        <div className="p_12">
                            <p className="table_td">{params.value}</p>
                        </div>
                    );
                },
            },
            {
                Header: t('marshrut'),
                accessor: 'routes',
                Cell: (params: any) => {
                    return (
                        <div className="p_12">
                            <p className="table_td">{params.value}</p>
                        </div>
                    );
                },
            },
            {
                Header: t('operations'),
                accessor: 'operations',
                Cell: (params: any) => {
                    const handleIcon = (edit: boolean) => {
                        const {color} = params.row.original;

                        if (edit) {
                            navigate('edit', {
                                state: {...params.row.original},
                            });
                            setOpenSide(true);
                            setColor(
                                stringToRgba(
                                    parsedColorText(
                                        color || 'rgba(0, 0, 0, 0.5)',
                                    ),
                                ),
                            );
                        } else {
                            navigate('save', {
                                state: {...params.row.original},
                            });
                        }
                    };

                    return (
                        <div className={c('flex__center', 'gap_20')}>
                            <IconButton onClick={() => handleIcon(false)}>
                                <VisibleIcon />
                            </IconButton>
                            {canEdit && (
                                <IconButton onClick={() => handleIcon(true)}>
                                    <Edit className="fill__gray" />
                                </IconButton>
                            )}
                        </div>
                    );
                },
            },
            {
                // Header: <CellHotspotIcon />,
                Header: t('status'),
                accessor: 'completed',
                Cell: (params: any) => {
                    if (params.value) {
                        return (
                            <div className="center">
                                <div
                                    className={c('round_icon', 'bg__success')}
                                ></div>
                            </div>
                        );
                    } else {
                        return (
                            <div className="center">
                                <div className={c('round_icon')}></div>
                            </div>
                        );
                    }
                },
            },
        ],
        [t],
    );

    return {columns};
};

export default useData;
