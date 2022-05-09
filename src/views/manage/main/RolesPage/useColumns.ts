import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

export const useColumns = () => {
    const {t} = useTranslation();

    return useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'col1',
                width: 10,
                maxWidth: 30,
            },
            {
                Header: t('name'),
                accessor: 'name',
                Cell: (props: any) => {
                    if (props?.value === '') {
                        return '-';
                    } else {
                        return props?.value;
                    }
                },
            },
            {
                Header: t('remark'),
                accessor: 'remark',
                Cell: (props: any) => {
                    if (props?.value === '') {
                        return '-';
                    } else {
                        return props?.value;
                    }
                },
            },
        ],
        [t],
    );
};
