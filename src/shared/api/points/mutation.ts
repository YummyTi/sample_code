import {useTranslation} from 'react-i18next';
import {useMutation} from 'react-query';

import {IPoint} from '@src/shared/models/point_model';
import {useEditRouteStore} from '@src/shared/store/edit_route';

import {localNotification} from '@shared/helpers';

import {savePoints} from './index';

const {notifySuccess} = localNotification;

const useSavePoint = () => {
    const {t} = useTranslation();
    const setTab = useEditRouteStore((state) => state.setTab);

    const handleSave = useMutation((data: IPoint) => savePoints(data), {
        onSuccess: (data) => {
            setTab('4');
            notifySuccess(t('point_saved'));
        },
    });

    return {
        handleSave,
    };
};

export default useSavePoint;
