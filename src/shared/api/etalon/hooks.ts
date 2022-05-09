import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';

import {DAYS} from '@src/shared/constants';
import {IEtalon} from '@src/shared/models/etalon_model';
// import {useEditRouteStore} from '@src/store/edit_route';
import {useEtalonStore} from '@src/shared/store/etalon';
import {mockData} from '@src/shared/store/etalon/mockData';

import {getEtalon} from './index';

const useEtalon = (state: any, routeIdN?: any) => {
    const {t} = useTranslation();
    // const routeId = useEditRouteStore((state) => state.routeId);
    const setData = useEtalonStore((state) => state.setData);

    const handleName = (name: string) => {
        switch (name) {
            case DAYS.MONDAY:
                return t('md');
                break;
            case DAYS.OTHER:
                return `${t('td')}-${t('fd')}`;
                break;
            case DAYS.SATURDAY:
                return t('std');
                break;
            case DAYS.SUNDAY:
                return t('sd');
                break;
            default:
                return t('md');
                break;
        }
    };

    const {routeId} = state;

    const {isLoading} = useQuery(
        ['etalon', routeId],
        () => getEtalon(routeId || routeIdN),
        {
            enabled: !!routeId || routeIdN !== null,
            refetchOnWindowFocus: false,
            retry: false,
            onSuccess: (data) => {
                console.log(data.data.data, 'data etalon');
                const list = data.data.data;
                if (list.length > 1) {
                    setData(
                        list.map((item: IEtalon, index: number) => ({
                            ...item,
                            id: index,
                            allTransport: item.obsh,
                            mor6: item.h6,
                            mor8: item.h8,
                            mor9: item.h9,
                            aft14: item.h14,
                            aft15: item.h15,
                            aft17: item.h17,
                            evn19: item.h19,
                            evn21: item.h21,
                            evn22: item.h22,
                            evn23: item.h23,
                            per0: item.race,
                            norm_fuel: item.normtop,
                            per10: 0,
                            per15: 0,
                            per20: 0,
                            name: handleName(item.day),
                        })),
                    );
                } else {
                    setData(mockData);
                }
            },
        },
    );

    return {isLoading};
};

export default useEtalon;
