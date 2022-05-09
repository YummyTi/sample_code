import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import rusIcon from '@src/images/Header/russia.png';
import uzbIcon from '@src/images/Header/uzbekistán.png';
import ArrowDown from '@src/images/svgs/ArrowDown';
import {useLanguageStore} from '@src/shared/store/language';

import LangSelectItem from './LangSelectItem';

const LangSelect = () => {
    const {i18n} = useTranslation();
    const [activeValue, setActiveValue] = useState(
        localStorage.getItem('language') || 'ru',
    );
    const [open, setOpen] = useState(false);
    const {lang, setLang} = useLanguageStore((state) => ({...state}), shallow);

    const renderLangArr = useMemo(() => {
        const initialOptions = [
            {
                label: activeValue === 'ru' ? 'Рус' : 'Rus',
                value: 'ru',
                icon: rusIcon,
            },
            {
                label: activeValue === 'ru' ? 'Узб' : 'Uzb',
                value: 'uz',
                icon: uzbIcon,
            },
        ];

        return lang.value === 'ru'
            ? initialOptions
            : [initialOptions[initialOptions.length - 1], initialOptions[0]];
    }, [lang]);

    const [options, setOptions] = useState(renderLangArr);

    const handleOpenLangBlock = () => {
        setOpen(!open);
    };

    const switchLang = (value: string, id: number) => {
        setOpen(false);
        i18n.changeLanguage(value);
        setActiveValue(value);
        const newLangArr = options;
        const currentLanguage = options[id];
        setLang({label: currentLanguage.label, value: currentLanguage.value});
        newLangArr[id] = newLangArr[0];
        newLangArr[0] = currentLanguage;
        setOptions(newLangArr);
    };

    return (
        <div onClick={handleOpenLangBlock} className="langWrap">
            <div className="langWrap__option">
                <div className={`langWrap__list ${open ? 'active' : ''}`}>
                    {options?.length &&
                        options?.map((item, index) => {
                            return (
                                <LangSelectItem
                                    key={index}
                                    id={index}
                                    value={item.value}
                                    switchLang={switchLang}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            );
                        })}
                </div>
            </div>
            <div className="langWrap__down">
                <ArrowDown className="langWrap_arrow" />
            </div>
        </div>
    );
};

export default LangSelect;
