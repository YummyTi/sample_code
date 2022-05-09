import {selectStyles} from '@styles/components/helperStyles';

export const mySelectStyles = {
    ...selectStyles,
    selectStyle: {
        ...selectStyles.selectStyle,
        borderRadius: '4px 0px 0px 4px',
    },
    height: '40px',

    placeHolder: {
        color: '#475366',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '16px',
    },
};
