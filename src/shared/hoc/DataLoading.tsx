import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import {useTranslation} from 'react-i18next';

interface IProps {
    loading: boolean;
    data: any[];
    children: any;
}

const DataLoading = ({loading, data, children}: Partial<IProps>) => {
    const {t} = useTranslation();
    if (loading) {
        return (
            <div className="center__file" style={{padding: '20px'}}>
                <CircularProgress />
            </div>
        );
    }

    if (data?.length === 0 || !data) {
        return (
            <div className="center__file">
                <h4>{t('no_data')}</h4>
            </div>
        );
    }
    return children;
};

export default React.memo(DataLoading);
