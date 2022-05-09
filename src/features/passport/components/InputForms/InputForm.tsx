import React from 'react';
import {Control} from 'react-hook-form';

import InputTemplate from '@src/shared/components/CustomInput';

import {SubmitDataModel} from '@models/passport_model';

import s from './index.module.scss';

type InputFormProps = {
    label?: string;
    control: Control<SubmitDataModel, any>;
    name: keyof SubmitDataModel;
    placeholder?: string;
    errors?: any;
    type?: any;
};

export const InputForm: React.FC<InputFormProps> = ({
    label,
    control,
    name,
    placeholder,
    errors,
    ...props
}) => {
    return (
        <div className={s.inputWrapper}>
            <span className={s.inputLabel}>{label}</span>
            <InputTemplate
                control={control}
                name={name}
                placeholder={placeholder}
                errors={errors}
                {...props}
            />
        </div>
    );
};
