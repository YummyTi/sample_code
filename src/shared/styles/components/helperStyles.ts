const font = {
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '16px',
    color: '#475366',
};

const border = {
    border: '1px solid #C6CAD8',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
};

export const selectStyles = {
    ...font,
    height: '40px',
    indicatorSeparator: null,
    selectStyle: {
        ...border,
        inputColor: '#F2F3F4',
        inputFontSize: '12px',
        weight: 'normal',
        lineHeight: '16px',
        color: '#475366',
        bgcolor: '#F2F3F4',
        inpadding: '6px',
    },
    menuListStyle: {
        padding: '16px',
    },
};

export const inputStyles = {
    '& .MuiOutlinedInput-root': {
        padding: '0px',
        '& > fieldset': {
            border: 'none',
        },
    },
    '& .MuiInputBase-input': {
        ...border,
        ...font,
        background: '#FFFFFF',
        height: '40px',
    },
};

export const remarkStyles = {
    '& .MuiOutlinedInput-root': {
        padding: '0px',
        '& > fieldset': {
            border: 'none',
        },
    },
    '& .MuiInputBase-input': {
        ...border,
        ...font,
        padding: '12px',
        height: '67px',
    },
};

export const commentInput = {
    '& .MuiOutlinedInput-root': {
        background: '#FFFFFF',
        padding: '0px',
        '& > fieldset': {
            border: 'none',
        },
    },
    '& .MuiInputBase-input': {
        ...border,
        ...font,
        padding: '10px',
        height: '65px',
    },
};
