import {useQuery} from 'react-query';
import shallow from 'zustand/shallow';

import {useKPPStore} from '@src/shared/store/protocol';

import {getProtocolData} from '.';

export const useProtocolData = (id: number) => {
    const {setKpp1, setKpp2} = useKPPStore((state) => ({...state}), shallow);

    const {data, isLoading} = useQuery(
        ['protocolData', id],
        () => getProtocolData(id),
        {
            refetchOnWindowFocus: false,
            retry: 1,
            enabled: !!id,
            onSuccess: (data) => {
                const kpp1Checker = data.data.kpp1 ? data.data.kpp1 : [];
                const kpp2Checker = data.data.kpp2 ? data.data.kpp2 : [];

                kpp1Checker.map((item: any) => {
                    if (
                        item['mej_punkt'] == 'null' ||
                        item['mej_punkt'] == null ||
                        item['mej_punkt'] == 0 ||
                        item['mej_punkt'] == 0
                    ) {
                        item['mej_punkt'] = '0';
                    }

                    if (
                        item['naprav'] == 'null' ||
                        item['naprav'] == null ||
                        item['naprav'] == 0 ||
                        item['naprav'] == 0
                    ) {
                        item['naprav'] = '0';
                    }
                });

                kpp2Checker.map((item: any) => {
                    if (
                        item['mej_punkt'] == 'null' ||
                        item['mej_punkt'] == null ||
                        item['mej_punkt'] == 0 ||
                        item['mej_punkt'] == 0
                    ) {
                        item['mej_punkt'] = '0';
                    }

                    if (
                        item['naprav'] == 'null' ||
                        item['naprav'] == null ||
                        item['naprav'] == 0 ||
                        item['naprav'] == 0
                    ) {
                        item['naprav'] = '0';
                    }
                });

                setKpp1(
                    kpp1Checker.map((item: any, index: number) => ({
                        ...item,
                        id: index + 1,
                    })),
                );

                setKpp2(
                    kpp2Checker.map((item: any, index: number) => ({
                        ...item,
                        id: index + 1,
                    })),
                );
            },
        },
    );

    return {isLoading};
};
