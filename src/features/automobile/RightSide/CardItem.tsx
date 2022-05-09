import c from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {useParkStore} from '@src/shared/store/park';

const CardItem = () => {
    const {t} = useTranslation();
    const park = useParkStore((state) => state.selectedPark);

    return (
        <div className="card__container">
            <div
                className={c('card__header', 'gap_10', 'd_flex', 'flex_column')}
            >
                <div className="row">
                    <div className="card__item">
                        <p className="card__sub__title">{t('garage_name')}</p>
                        <h3 className="card__body__head">
                            {park[0]['garage_name']}
                        </h3>
                    </div>
                    <div className="card__item">
                        <p className="card__sub__title">{t('park')}</p>
                        <h3 className="card__body__head">{park[0]['park']}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="card__item">
                        <p className="card__sub__title">{t('garage_name')}</p>
                        <h3 className="card__body__head">
                            {park[0]['garage_name']}
                        </h3>
                    </div>
                    <div className="card__item">
                        <p className="card__sub__title">
                            {t('license_number')}
                        </p>
                        <h3 className="card__body__head">
                            {park[0]['license_number']}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItem;
