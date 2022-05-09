import {Button, CircularProgress} from '@mui/material';
import c from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import SearchIconGray from '@src/images/svgs/SearchIconGray';

import s from './index.module.scss';

interface IStyle {
    wrapper: string;
    baseSideSearch: string;
    inputSearch: string;
    iconBoxSearch: string;
    sideSearch: string;
    activeSearch: string;
    bottomSideSearch: string;
}
interface IProps {
    activeSide: number;
    value: string;
    handleChange: (e: any) => void;
    handleActive: (value: number) => void;
    handleItem: (item: any) => void;
    options: any;
    isLoading: boolean;
    firstText: string;
    secondText: string;
    visible?: boolean;
    styles: Partial<IStyle> | any;
}

const SearchComponent = ({
    activeSide,
    value,
    handleChange,
    handleActive,
    handleItem,
    options,
    isLoading,
    firstText,
    secondText,
    visible = true,
    styles,
}: IProps) => {
    const {t} = useTranslation();

    return (
        <div className={c(s.wrapper, [styles && styles?.wrapper])}>
            <div className={c(s.baseSide, [styles && styles?.baseSideSearch])}>
                <div className={s.inputWrapper}>
                    <SearchIconGray />
                    <input
                        value={value}
                        onChange={handleChange}
                        placeholder={t('search')}
                        className={s.input}
                        type="search"
                    />
                </div>
                <div
                    className={c(s.iconBox, [styles && styles?.iconBoxSearch])}
                >
                    <Button
                        className={c(s.side, [activeSide === 1 && s.active])}
                        onClick={() => handleActive(1)}
                    >
                        {t(firstText)}
                    </Button>
                    <Button
                        className={c(s.side, [activeSide === 2 && s.active])}
                        onClick={() => handleActive(2)}
                    >
                        {t(secondText)}
                    </Button>
                </div>
            </div>
            {value.length > 0 && visible && (
                <div
                    className={c(s.bottomSide, [
                        styles && styles?.bottomSideSearch,
                    ])}
                >
                    {isLoading ? (
                        <div className={c('center__file', s.loading)}>
                            <CircularProgress size={20} />
                        </div>
                    ) : options?.length === 0 || !options ? (
                        <div className="center">
                            <p className={s.noResult}>{t('no_data')}</p>
                        </div>
                    ) : (
                        options?.length > 0 &&
                        options?.map((item: any) => {
                            return (
                                <div
                                    onClick={() => handleItem(item)}
                                    key={item.id}
                                    className={c(s.item)}
                                >
                                    <p>{item?.label || item?.name}</p>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
