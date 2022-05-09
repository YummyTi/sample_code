import {StylesConfig} from 'react-select';

import {Props} from './type';

export const customStyle = (props: Props): StylesConfig => ({
    menuPortal: (base) => ({...base, zIndex: 9999999999}),
    menuList: (base) => ({
        ...base,
        minHeight: 50,
        maxHeight: props.isBranchHeight ? 100 : 200,
        padding: props.menuListStyle?.padding,
    }),
    placeholder: (base) => ({
        ...base,
        color: props.error ? 'red' : 'black',
        ...(props?.placeHolder && props?.placeHolder),
    }),
    control: (base) => ({
        ...base,

        height: props.height ?? base.height,
        fontWeight: props?.fontWeight,
        fontSize: props?.fontSize,
        lineHeight: props?.lineHeight,
        color: props?.color,
        border: props.error
            ? '1px solid #d32f2f'
            : props.selectStyle?.border
            ? props.selectStyle?.border
            : '1px solid #C2C2C2',

        boxShadow: props.selectStyle?.boxShadow || 'none',
        '&:hover': {
            border: 'inherite',
        },
        borderBottom: props.selectStyle?.borderbottom ?? base.borderBottom,
        backgroundColor: props.selectStyle?.bgcolor ?? 'white',
        borderRadius:
            props.selectStyle?.radius === 0
                ? 0
                : props.selectStyle?.borderRadius
                ? props.selectStyle?.borderRadius
                : '4px',
    }),
    valueContainer: (base) => ({
        ...base,
        padding: props.valuePadding ?? base.padding,
    }),
    option: (base, state) => {
        return {
            ...base,
            color: state.isDisabled
                ? '#c7c7c7'
                : props.selectStyle?.color
                ? props.selectStyle?.color
                : '#223367',
            fontWeight: props.selectStyle?.weight ?? '500',
            fontSize: props.selectStyle?.inputFontSize,
            lineHeight: props.selectStyle?.lineHeight,
            backgroundColor:
                (state.isFocused || state.isSelected) &&
                !props.selectStyle?.inputColor
                    ? '#E8F0FE'
                    : (state.isFocused || state.isSelected) &&
                      props.selectStyle?.inputColor
                    ? props.selectStyle?.inputColor
                    : 'white',
            cursor: state.isDisabled ? 'not-allowed' : 'pointer',
            padding: props.selectStyle?.inpadding,
            borderRadius: props.selectStyle?.borderRadius,
        };
    },
    clearIndicator: (base) => ({
        ...base,
        padding: props.indicatorPadding ?? base.padding,
    }),
    indicatorSeparator: (base) =>
        props.indicatorSeparator === null ? {display: 'none'} : base,
});
