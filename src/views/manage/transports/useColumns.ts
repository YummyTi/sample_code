import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

export const useColumns = () => {
    const {t} = useTranslation();

    const columns: any = useMemo(
        () => [
            {Header: 'Id', accessor: 'col1', width: 30},
            {Header: t('park_name'), accessor: 'park_name'},
            {Header: t('gos_number'), accessor: 'gos_number'},
            {Header: t('garage_number'), accessor: 'garage_number'},
            {Header: t('tracker_id'), accessor: 'tracker'},
            {Header: t('marshrut'), accessor: 'route_name'},
            {Header: t('model_autotransports'), accessor: 'bus_model'},
            {Header: t('telefon'), accessor: 'tel'},
            {Header: t('username'), accessor: 'user_name'},
        ],
        [t],
    );

    return columns;
};
