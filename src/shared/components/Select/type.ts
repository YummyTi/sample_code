import {CSSObjectWithLabel} from 'react-select';

export interface Props {
    isStatic?: boolean;
    defaultValue?: any;
    isDisabled?: boolean;
    isLoading?: boolean;
    isClearable?: boolean;
    isSearchable?: boolean;
    name?: string;
    menuPortalTarget?: any;
    options?: {value?: any; label?: any; name?: any}[];
    isMulti?: boolean;
    isBranchHeight?: boolean;
    error?: boolean;
    autoFocus?: boolean;
    className?: any;
    fontSize?: any;
    fontWeight?: any;
    lineHeight?: any;
    color?: any;
    dataCy?: any;
    onChange?: (e: any) => void;
    placeholder?: string;
    nooptionsmessage?: any;
    value?: any;
    label?: any;
    labelStyle?: {
        color?: string;
        weight?: string | number;
        fontSize?: {
            mobile?: number;
            planshet?: number;
            laptop?: number;
            desktop?: number;
        };
    };
    lmargin?: {
        mobile?: number;
        planshet?: number;
        laptop?: number;
        desktop?: number;
    };
    menuListStyle?: {
        padding?: any;
    };
    valuePadding?: any;
    indicatorPadding?: any;
    selectStyle?: {
        maxHeight?: string | number;
        color?: string;
        bgcolor?: string;
        inputColor?: string;
        weight?: string | number;
        lineHeight?: any;
        margin?: string;
        border?: string;
        borderRadius?: string | number;
        borderbottom?: string;
        shadow?: string;
        radius?: number;
        deleteColor?: string;
        deleteBgColor?: string;
        inpadding?: string;
        fontSize?: {
            mobile?: number;
            planshet?: number;
            laptop?: number;
            desktop?: number;
        };
        inputFontSize?: any;
        valuebgcolor?: string;
        height?: {
            mobile?: number;
            planshet?: number;
            laptop?: number;
            desktop?: number;
        };
        placeholdercolor?: string;
        placewieght?: string;
        boxShadow?: string;
    };
    placeHolder?: CSSObjectWithLabel;
    IconDown?: any;
    width?: {
        maxwidth?: number;
        minwidth?: number;
        width?: string;
    };
    height?: any;
    margin?: {
        mobile?: string;
        planshet?: string;
        laptop?: string;
        desktop?: string;
    };
    message?: any;
    field?: any;
    iconmargin?: string;
    icon?: any;
    iconleft?: string;
    iconright?: string;
    icondowncolor?: string;
    isOptionDisabled?: any;
    indicatorSeparator?: any;
}
