import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import MultiSelect from '@src/shared/components/Select';
import {useAccessStore} from '@src/shared/store/access_rights';

import styles from './index.module.scss';

const ActiveSelect = () => {
    const {t} = useTranslation();
    const setStatus = useAccessStore((state) => state.setStatus);

    const options = useMemo(() => {
        return [
            {label: t('active'), value: 'true'},
            {label: t('inactive'), value: 'false'},
        ];
    }, [t]);

    const handleChange = useCallback((event) => {
        console.log(event, 'event');
        setStatus(event.value);
    }, []);

    return (
        <div className={styles.rightSide}>
            <p className={styles.rightText}>{t('sort_by')}</p>
            <MultiSelect
                options={options}
                isMulti={false}
                placeholder={t('select_status')}
                margin={{
                    laptop: '0',
                }}
                onChange={handleChange}
                isClearable={false}
                nooptionsmessage={t('no_data')}
                isStatic
            />
        </div>
    );
};

export default React.memo(ActiveSelect);
