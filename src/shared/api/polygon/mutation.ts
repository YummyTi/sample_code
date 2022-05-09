import {useTranslation} from 'react-i18next';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';
import shallow from 'zustand/shallow';

import {localNotification} from '@shared/helpers';
import {PolygonSaveModel} from '@shared/models/polygon_model';
import {usePolygonStore} from '@shared/store/polygon';

import {savePolygon} from './index';

const {notifySuccess} = localNotification;

const usePolygonMutate = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {setPolygon, setOpenSide, setRefetch, refetch} = usePolygonStore(
        (state) => ({...state}),
        shallow,
    );
    const handleSave = useMutation(
        (body: PolygonSaveModel) => savePolygon(body),
        {
            onSuccess: () => {
                navigate('/polygons');
                notifySuccess(t('saved'));
                setOpenSide(false);
                setPolygon([]);
                setRefetch(refetch + 1);
            },
        },
    );

    return {
        handleSave,
    };
};

export default usePolygonMutate;
