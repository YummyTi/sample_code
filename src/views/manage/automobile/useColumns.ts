import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

export const useColumns = () => {
    const {t} = useTranslation();

    const columns: any = useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'col1',
                width: 30,
            },
            {
                Header: t('name'),
                accessor: 'park',
                Cell: (props: any) => {
                    if (props.value === '') {
                        return '-';
                    } else {
                        return props.value;
                    }
                },
            },
            {
                Header: t('license_number'),
                accessor: 'license_number',
            },

            {
                Header: t('remark'),
                accessor: 'remark',
                Cell: (props: any) => {
                    if (props.value === '') {
                        return '-';
                    } else {
                        return props.value;
                    }
                },
            },
        ],
        [t],
    );

    return columns;
};
