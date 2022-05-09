import {useQuery} from 'react-query';

import {IPassport} from '@src/shared/models/passport_model';

import {getPassportData} from '.';

export const usePassportData = (id: any) => {
    const {data, isLoading} = useQuery(
        ['passportData', id],
        () => getPassportData(id),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            enabled: !!id,
        },
    );

    const passportData: IPassport = data?.data?.[0];

    return {passportData, isLoading};
};
