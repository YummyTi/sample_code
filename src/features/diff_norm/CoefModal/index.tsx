import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import DialogWrapper from '@src/shared/components/CustomDialog';
import DataLoading from '@src/shared/hoc/DataLoading';

import {useCoefList} from '@api/diff_norm/hooks';
import TableInstance from '@features/diff_norm/TableTemplate';
import {useDiffNormStore} from '@store/race_fuel';

import s from './index.module.scss';
import {useColumns} from './lib';
import {useCoefModalHook} from './model';

const CoefModal = () => {
    const {t} = useTranslation();
    const coef = useCoefList();
    const {isCoefOpen, setCoefOpen, setCoefList} = useDiffNormStore(
        (state) => state,
        shallow,
    );
    const {data, values, saveLoading, onSave} = useCoefModalHook(coef.data);
    const columns = useColumns();

    return (
        <DialogWrapper
            title={t('coef_list')}
            open={isCoefOpen}
            onClose={setCoefOpen}
            save={onSave}
            isLoading={saveLoading}
            contentStyles={s.dcontent}
        >
            <div className={s.wrapper}>
                <DataLoading loading={coef.isLoading} data={coef.data}>
                    <TableInstance
                        columns={columns}
                        data={data}
                        setData={setCoefList}
                    />

                    <div className={s.footer}>
                        <div className={s.element}>
                            <span>{t('coef_full')}</span>
                            <input
                                className={s.input}
                                type="number"
                                name="coefficient"
                                ref={values.coefficient}
                            />
                        </div>
                        <div className={s.element}>
                            <span>{t('value')}</span>
                            <input
                                className={s.input}
                                type="number"
                                ref={values.amount}
                                name="amount"
                            />
                        </div>
                    </div>
                </DataLoading>
            </div>
        </DialogWrapper>
    );
};

export default React.memo(CoefModal);
