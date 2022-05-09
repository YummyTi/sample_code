import React from 'react';

export const ControlButtonItem = (props: any) => {
    const {icon, type, handleControl, activeButton, baseClassName, status} =
        props;
    return (
        <button
            onClick={() => handleControl(type)}
            className={status === type ? activeButton : baseClassName}
        >
            {icon}
        </button>
    );
};
