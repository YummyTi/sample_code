import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import DataLoading from '@src/shared/hoc/DataLoading';

import RouteItem from '@components/RouteItem';
import {useParkStore} from '@shared/store/park';
import {useDiffNormStore} from '@store/race_fuel';

import styles from './index.module.scss';

type Props = {
    isLoading: boolean;
};

const ParkList: FC<Props> = ({isLoading}) => {
    const {t} = useTranslation();
    const parks = useParkStore((state) => state.parks);
    const {park_id, setParkId} = useDiffNormStore((state) => state, shallow);

    return (
        <div className="order__side">
            <div className="park__list">
                <div className="park__list__head">
                    <h4>{t('auto_parks')}</h4>
                </div>
                <DataLoading loading={isLoading} data={parks}>
                    <div className={styles.container}>
                        {parks.map((route) => (
                            <RouteItem
                                key={route.park_id}
                                handleId={() => setParkId(route.park_id)}
                                selected={park_id === route.park_id}
                                id={route.park_id}
                                name={route.park}
                            />
                        ))}
                    </div>
                </DataLoading>
            </div>
        </div>
    );
};

export default ParkList;
