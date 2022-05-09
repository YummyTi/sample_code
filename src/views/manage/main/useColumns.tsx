import {Chip} from '@mui/material';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {useAccessStore} from '@src/shared/store/access_rights';

import styles from './index.module.scss';

export const useColumns = () => {
    const {t} = useTranslation();
    const page = useAccessStore((state) => state.page);

    return useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'col1',
                width: 55,
                Cell: (props: any) =>
                    page > 1 ? page * 10 + props.value : props.value,
            },
            {
                Header: t('name'),
                accessor: 'fullname',
                Cell: (props: any) => {
                    if (props.value === '') {
                        return '-';
                    } else {
                        return props.value;
                    }
                },
            },
            {
                Header: t('login'),
                accessor: 'login',
            },

            {
                Header: t('role'),
                accessor: 'role.name',
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
            {
                Header: t('status'),
                accessor: 'is_activated',
                Cell: (props: any) => {
                    if (props.value === false) {
                        return (
                            <Chip
                                variant="outlined"
                                color="error"
                                size="small"
                                label={t('not_active')}
                            />
                        );
                    }
                    return (
                        <Chip
                            variant="outlined"
                            color="success"
                            size="small"
                            className={styles.success}
                            label={t('active')}
                        />
                    );
                },
            },
        ],
        [t, page],
    );
};
