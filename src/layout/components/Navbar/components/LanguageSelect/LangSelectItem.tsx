import React from 'react';

type LangType = {
    id: number;
    label: string;
    icon: any;
    value: string;
    switchLang: (value: string, id: number) => void;
};
const LangSelectItem = ({label, icon, value, switchLang, id}: LangType) => {
    const handleSelectLang = (value: string) => {
        switchLang(value, id);
    };

    return (
        <div
            onClick={() => handleSelectLang(value)}
            key={label}
            className="langWrap__item"
        >
            <img src={icon} alt="Lang" />
            <span className="langName">{label}</span>
        </div>
    );
};

export default LangSelectItem;
