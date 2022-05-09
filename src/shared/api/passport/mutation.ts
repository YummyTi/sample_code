import {useTranslation} from 'react-i18next';
import {useMutation} from 'react-query';

import {ISavePassport} from '@src/shared/models/passport_model';
import {useEditRouteStore} from '@src/shared/store/edit_route';
import {useRouteStepStore} from '@src/shared/store/route_step';

import {localNotification} from '@shared/helpers';

import {savePassport} from './index';

const {notifySuccess} = localNotification;

const useSavePassport = () => {
    const {t} = useTranslation();
    const setTab = useEditRouteStore((state) => state.setTab);
    const setStep = useRouteStepStore((state) => state.setRouteId);

    const handleSave = useMutation(
        (data: ISavePassport) => savePassport(data),
        {
            onSuccess: (data) => {
                setStep(data.data.data);
                notifySuccess(t('passport_saved'));
                setTimeout(() => {
                    setTab('2');
                }, 1000);
            },
        },
    );

    return handleSave;
};

export default useSavePassport;
