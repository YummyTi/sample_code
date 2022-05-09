import {CircularProgress} from '@mui/material';
import Chip from '@mui/material/Chip';
import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import IconBus from '@src/images/svgs/IconBus';
import {IUserParkModel} from '@src/shared/models/user_park_model';
import {useAccessStore} from '@src/shared/store/access_rights';

import styles from './index.module.scss';

interface IProps {
    data: IUserParkModel[];
    isLoading: boolean;
}

const CardItem = ({data, isLoading}: IProps) => {
    const {t} = useTranslation();
    const user = useAccessStore((state) => state.selectedUsers);

    const handleStatusUser = () => {
        if (user[0]?.is_activated) {
            return (
                <Chip
                    variant="outlined"
                    color="success"
                    size="small"
                    className="chip__success"
                    label={t('active')}
                />
            );
        } else {
            return (
                <Chip
                    variant="outlined"
                    size="small"
                    className="chip__inactive"
                    label={t('inactive')}
                />
            );
        }
    };

    return (
        <div className="card__container">
            <div className="card__header">
                <div className="card__row">
                    <div className="card__item">
                        <p className="card__sub__title">Ф.И.О.</p>
                        <h3 className="card__body__head">{user[0].fullname}</h3>
                    </div>
                    <div className="card__item">{handleStatusUser()}</div>
                </div>
            </div>
            <div className="card__content">
                <div className="card_sub_row">
                    <div className="card__item">
                        <p className="card__sub__title">{t('login')}</p>
                        <h3 className="card__body">{user[0].login}</h3>
                    </div>
                    <div className="card__item">
                        <p className="card__sub__title">{t('password')}</p>
                        <h3 className="card__body">-</h3>
                    </div>
                    <div className="card__item">
                        <p className="card__sub__title">{t('role')}</p>
                        <h3 className="card__body">{user[0]?.role.id}</h3>
                    </div>
                </div>
            </div>
            <div className="card__content">
                <div className={cx('card_sub_row', 'mb_24')}>
                    <div className={cx('card__item', styles.cardItem)}>
                        <p className="card__sub__title">{t('region')}</p>
                        <h3 className="card__body">{user[0].region?.name}</h3>
                    </div>
                    <div className={cx('card__item', styles.cardItem)}>
                        <p className="card__sub__title">
                            {t('fixed_automobile')}
                        </p>
                        <div className={styles.iconBox}>
                            {isLoading ? (
                                <div className="center">
                                    <CircularProgress size={20} />
                                </div>
                            ) : (
                                data?.length > 0 &&
                                data?.map((item, index) => (
                                    <Chip
                                        key={index}
                                        variant="outlined"
                                        icon={<IconBus className="bus__icon" />}
                                        label={item.name}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className={'card_sub_row'}>
                    <div className="card__item">
                        <p className="card__sub__title">{t('remark_user')}</p>
                        <h3 className="card__body">
                            {user[0]?.remark === '' ? '-' : user[0]?.remark}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CardItem);
