import {useTranslation} from 'react-i18next';
import {useMutation} from 'react-query';

import {SaveEtalon} from '@src/shared/models/etalon_model';
import {useRouteStepStore} from '@src/shared/store/route_step';

import {localNotification} from '@shared/helpers';

import {saveEtalon} from './index';

const {notifySuccess} = localNotification;

const useEtalonMutate = () => {
    const {t} = useTranslation();

    const handleSave = useMutation((data: SaveEtalon) => saveEtalon(data), {
        onSuccess: (data) => {
            notifySuccess(t('etalonSaved'));
        },
    });

    return {
        handleSave,
    };
};

export default useEtalonMutate;
