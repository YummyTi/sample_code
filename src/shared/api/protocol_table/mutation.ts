import {useTranslation} from 'react-i18next';
import {useMutation} from 'react-query';

import {IProtocolSave} from '@src/shared/models/protocolData_model';
import {useEditRouteStore} from '@src/shared/store/edit_route';

import {localNotification} from '@shared/helpers';

import {saveProtocolData} from './index';

const {notifySuccess} = localNotification;

const useSaveProtocol = () => {
    const {t} = useTranslation();
    const setTab = useEditRouteStore((state) => state.setTab);

    const handleSaveProtocol = useMutation(
        (data: IProtocolSave) => saveProtocolData(data),
        {
            onSuccess: (data) => {
                notifySuccess(t('protocol_saved'));
                setTab('5');
            },
        },
    );

    return handleSaveProtocol;
};

export default useSaveProtocol;
