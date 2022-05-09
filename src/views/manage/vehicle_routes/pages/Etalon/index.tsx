import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import useEtalon from '@api/etalon/hooks';
import useEtalonMutate from '@api/etalon/mutation';
import EtalonTable from '@features/etalon/components/EtalonTable';
import {BtnSave} from '@features/vehicle_routes/components';
import {DAYS} from '@shared/constants';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {useEditRouteStore} from '@store/edit_route';
import {useEtalonStore} from '@store/etalon';
import {useRouteStepStore} from '@store/route_step';

import styles from './index.module.scss';

const Etalon = () => {
    const location = useLocation();
    const {handleSave} = useEtalonMutate();
    const setTab = useEditRouteStore((state) => state.setTab);
    const routeId = useEditRouteStore((state) => state.routeId);
    const data = useEtalonStore((state) => state.data);
    const stepRouteId = useRouteStepStore((state) => state.routeId);
    const {canEdit} = useLocationPermission('routes');

    const {isLoading} = useEtalon(location.state, stepRouteId);

    const handleName = (name: string) => {
        switch (name) {
            case 'ПН' || 'Du':
                return DAYS.MONDAY;
                break;
            case 'ВТ-ПТ' || 'Se-Ju':
                return DAYS.OTHER;
                break;
            case 'СБ' || 'Shan':
                return DAYS.SATURDAY;
                break;
            case 'ВС' || 'Yak':
                return DAYS.SUNDAY;
                break;
            default:
                return DAYS.MONDAY;
                break;
        }
    };

    const handleSaveMe = () => {
        handleSave.mutate({
            route_id: stepRouteId || routeId,
            etalons: data.map((row: any) => ({
                h6: row.mor6,
                h8: row.mor8,
                h9: row.mor9,
                h14: row.aft14,
                h15: row.aft15,
                h17: row.aft17,
                h19: row.evn19,
                h21: row.evn21,
                h22: row.evn22,
                h23: row.evn23,
                obsh:
                    +row.mor6 +
                    +row.mor8 +
                    +row.mor9 +
                    +row.aft14 +
                    +row.aft15 +
                    +row.aft17 +
                    +row.evn19 +
                    +row.evn21 +
                    +row.evn22 +
                    +row.evn23,
                norm_fuel: row.norm_fuel,
                day: handleName(row.name),
                race: row.per0,
            })),
        });
    };

    useEffect(() => {
        if (handleSave.isSuccess) {
            setTab('3');
        }
    }, [handleSave.isSuccess]);

    return (
        <div className={styles.container}>
            <EtalonTable />
            {canEdit && (
                <BtnSave
                    disabled={handleSave.isLoading}
                    handleSave={handleSaveMe}
                />
            )}
        </div>
    );
};

export default Etalon;
