import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';
import shallow from 'zustand/shallow';

import {useProtocolData} from '@api/protocol_table/hooks';
import useSaveProtocol from '@api/protocol_table/mutation';
import {ProtocolTable} from '@features/protocol/components/ProtocolTable';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {useLanguageStore} from '@store/language';
import {useKPPStore} from '@store/protocol';
import {useRouteStepStore} from '@store/route_step';

import styles from './index.module.scss';

interface LocationState {
    state: {
        routeId: number;
    };
}

const Protocol = () => {
    const handleSave = useSaveProtocol();
    const {t} = useTranslation();
    const location = useLocation();
    const stepRouteId = useRouteStepStore((state) => state.routeId);
    const {state} = location as LocationState;
    const {isLoading} = useProtocolData(state?.routeId || stepRouteId);
    const {kpp1Data, kpp2Data, setKpp1, setKpp2} = useKPPStore(
        (state) => ({...state}),
        shallow,
    );
    const {lang} = useLanguageStore((state) => ({...state}), shallow);
    const [updatedData, setUpdatedData] = useState([]);
    const {canEdit} = useLocationPermission('routes');

    console.log(kpp1Data, kpp2Data, 'kpp1Data, kpp2Data');

    const handleSaveProtocol = () => {
        const updatedProtocol = {
            route_id: state?.routeId,
            protocolStations: updatedData,
        };
        console.log('Updated: ', updatedProtocol);
        handleSave.mutate(updatedProtocol);
    };

    return (
        <div>
            <h2 className={'editVehicleWrapper__title ' + styles.protocolTitle}>
                {lang.value === 'ru'
                    ? t('protocol_measurement') +
                      ' ' +
                      (state?.routeId || '') +
                      '(прямое направление)'
                    : (state?.routeId || '') + t('protocol_measurement')}
            </h2>
            <div className={styles.protocolTableWrap}>
                {isLoading ? (
                    <div className={styles.protocolLoader}>
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <ProtocolTable
                            type="kpp1"
                            data={kpp1Data}
                            setData={setKpp1}
                            setUpdatedData={setUpdatedData}
                            updatedData={updatedData}
                        />
                        <ProtocolTable
                            type="kpp2"
                            data={kpp2Data}
                            setData={setKpp2}
                            setUpdatedData={setUpdatedData}
                            updatedData={updatedData}
                        />
                    </>
                )}
            </div>
            <div
                className={
                    isLoading ? styles.hideSaveBtn : styles.protocolSaveBlock
                }
            >
                {canEdit && (
                    <Button
                        variant="contained"
                        disabled={handleSave.isLoading}
                        onClick={handleSaveProtocol}
                        className={`btn__primary ${styles.protocolBtn}`}
                    >
                        {!handleSave.isLoading ? (
                            t('save')
                        ) : (
                            <CircularProgress size={25} color="inherit" />
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Protocol;
