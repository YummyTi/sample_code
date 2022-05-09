import {SelectedCheckbox} from '@entities/selected-checkbox';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import DialogWrapper from '@src/shared/components/CustomDialog';

import DataLoading from '@shared/hoc/DataLoading';
import {useDiffNormStore} from '@store/race_fuel';

import s from './index.module.scss';
import {useBusModelsHook} from './model';

const BusModels = () => {
    const {t} = useTranslation();
    const {setModelOpen, isModelOpen} = useDiffNormStore(
        (state) => state,
        shallow,
    );
    const {
        busModelData,
        dataLoading,
        isLoading,
        isChecked,
        toggleCheckbox,
        handleSubmit,
    } = useBusModelsHook();

    return (
        <DialogWrapper
            open={isModelOpen}
            onClose={setModelOpen}
            title={t('model_trans')}
            save={handleSubmit}
            isLoading={isLoading}
            contentStyles={s.dcontent}
        >
            <div className={s.wrapper}>
                <div className={s.header}>
                    <span className={s.title}>{t('naming')}</span>
                </div>
                <DataLoading loading={dataLoading} data={busModelData}>
                    {busModelData?.map((model) => (
                        <div
                            key={model.id}
                            onClick={() => toggleCheckbox(model)}
                            className={
                                isChecked(model) ? s.selected : s.element
                            }
                        >
                            <SelectedCheckbox row={model} />
                            <span>{model.name}</span>
                        </div>
                    ))}
                </DataLoading>
            </div>
        </DialogWrapper>
    );
};

export default React.memo(BusModels);
