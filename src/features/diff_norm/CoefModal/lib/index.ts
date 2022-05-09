import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import EditableCell from '../../EditableCell';
import ApplyButton from './ApplyButton';
import DeleteButton from './DeleteButton';

export const useColumns = () => {
    const {t} = useTranslation();

    return useMemo(
        () => [
            {
                Header: t('coef_full'),
                accessor: 'coefficient',
                Cell: EditableCell,
            },
            {Header: t('value'), accessor: 'amount', Cell: EditableCell},
            {Header: t('username'), accessor: 'last_user'},
            {Header: t('change_date'), accessor: 'last_date'},
            {Header: '', accessor: 'delete', Cell: DeleteButton},
            {Header: '', accessor: 'apply', Cell: ApplyButton},
        ],
        [],
    );
};
