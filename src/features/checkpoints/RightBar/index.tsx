import {Button} from '@mui/material';
import React from 'react';
import {useTranslation} from 'react-i18next';
import OutsideClickHandler from 'react-outside-click-handler';
import shallow from 'zustand/shallow';

import RightSideWrapper from '@src/shared/components/RightSideWrapper';
import DeleteDialog from '@src/shared/components/SureToDeleteDialog';

import InputController from '@components/InputController';
import SelectController from '@components/SelectController';
import {useMainStore} from '@store/main';
import {useStationsListStore} from '@store/stations_list';

import {styles} from '../lib';
import s from './index.module.scss';
import {useRightBarLogic} from './model';
import {RoutesWrapper, Searchfield} from './ui';

const {Wrapper, bstopStyles, idInput, psInput, selectStyles} = styles;

const RightBar = () => {
    const {t} = useTranslation();
    const openSide = useMainStore((state) => state.openSide);
    const {
        isEditable,
        station,
        draggableStation,
        setEditable,
        setDraggableStation,
    } = useStationsListStore((state) => state, shallow);
    const {
        control,
        typeOptions,
        handleSubmit,
        onSearchClick,
        handleClose,
        handleCancel,
        onSubmit,
        isDeleting,
        setDeleting,
        visible,
        setVisible,
        deleteStation,
        saveStation,
    } = useRightBarLogic();

    const isLocation = draggableStation?.lat
        ? draggableStation.lat !== station.lat ||
          draggableStation.lng !== station.lng
        : false;

    return (
        <OutsideClickHandler onOutsideClick={() => null}>
            <Wrapper isOpen={openSide}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <RightSideWrapper
                        title={t('stations')}
                        onEdit={() => setEditable(true)}
                        handleClose={handleClose}
                        onDelete={() => setDeleting(true)}
                        isEditable={isEditable}
                        handleCancel={handleCancel}
                        isLoading={saveStation.isLoading}
                    >
                        {!isEditable && (
                            <div className={s.element}>
                                <Searchfield
                                    handleClick={onSearchClick}
                                    visible={visible}
                                    setVisible={setVisible}
                                />
                            </div>
                        )}
                        <div className={s.element}>
                            <span>{t('field_name')}</span>
                            {isEditable ? (
                                <InputController
                                    control={control}
                                    name="name"
                                    placeholder={t('name')}
                                    sx={bstopStyles}
                                />
                            ) : (
                                <div className="roundedBlue">
                                    <span>{station?.name}</span>
                                </div>
                            )}
                        </div>
                        <div className={s.element}>
                            <span>{t('unique_id')}</span>
                            {isEditable ? (
                                <InputController
                                    control={control}
                                    name="stat_uniq_id"
                                    placeholder={t('id')}
                                    sx={idInput}
                                />
                            ) : (
                                <div className="roundedBlue">
                                    <span>{station?.stat_uniq_id || '-'}</span>
                                </div>
                            )}
                        </div>
                        <div className={s.element}>
                            <span>{t('longitude')}</span>
                            <div className="roundedBlue">
                                <span>
                                    {!draggableStation?.lng
                                        ? station?.lng || '-'
                                        : draggableStation.lng}
                                </span>
                            </div>
                        </div>
                        <div className={s.element}>
                            <span>{t('latitude')}</span>
                            <div className="roundedBlue">
                                <span>
                                    {!draggableStation?.lat
                                        ? station?.lat || '-'
                                        : draggableStation.lat}
                                </span>
                            </div>
                        </div>
                        <div className={s.element}>
                            <span>{t('type')}</span>
                            {isEditable ? (
                                <SelectController
                                    control={control}
                                    name="station_type"
                                    options={typeOptions}
                                    placeholder={t('type')}
                                    nooptionsmessage={t('no_options')}
                                    {...selectStyles}
                                />
                            ) : (
                                <div className="roundedBlue">
                                    <span>
                                        {typeOptions?.find(
                                            (item) =>
                                                item.value ===
                                                station?.station_type,
                                        )?.label || '-'}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={s.startElement}>
                            <span>{t('remark_user')}</span>
                            {isEditable ? (
                                <InputController
                                    control={control}
                                    name="remark"
                                    placeholder={t('description')}
                                    size="small"
                                    type="textarea"
                                    multiline
                                    sx={psInput}
                                />
                            ) : (
                                <div className="roundedBlue">
                                    <span style={{lineHeight: '25px'}}>
                                        {station?.remark
                                            ?.split(',')
                                            ?.join(', ') || '-'}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={s.routesElement}>
                            <span>{t('routes')}</span>
                            <RoutesWrapper control={control} />
                        </div>

                        {isEditable && (
                            <div className={s.element}>
                                <Button
                                    variant="contained"
                                    onClick={() => setDraggableStation(station)}
                                >
                                    {!isLocation
                                        ? 'Изменить локацию'
                                        : 'Вернуть прежнную локацию'}
                                </Button>
                            </div>
                        )}

                        {isDeleting && (
                            <DeleteDialog
                                payload={{ids: [station?.id]}}
                                open={isDeleting}
                                loading={deleteStation.isLoading}
                                close={() => setDeleting(false)}
                                handleDelete={deleteStation.mutate}
                            />
                        )}
                    </RightSideWrapper>
                </form>
            </Wrapper>
        </OutsideClickHandler>
    );
};

export default React.memo(RightBar);
