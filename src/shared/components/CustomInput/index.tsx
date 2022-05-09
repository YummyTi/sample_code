import React, {FC} from 'react';

import {inputStyles} from '@styles/components/helperStyles';

import InputController from '../InputController';

interface InputTemplateProps {
    placeholder?: string;
    control: any;
    errors?: any;
    name: string;
    width?: string;
}

const InputTemplate: FC<InputTemplateProps> = ({
    placeholder,
    errors,
    control,
    name,
    width,
    ...props
}) => {
    return (
        <div style={{width}}>
            <InputController
                control={control}
                name={name}
                placeholder={placeholder}
                errors={errors?.[name]?.type}
                message={errors?.[name]?.message}
                sx={inputStyles}
                {...props}
            />
        </div>
    );
};

export default InputTemplate;
