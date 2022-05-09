import React from 'react';
import {Control} from 'react-hook-form';

import SelectTemplate from '@src/shared/components/CustomSelect';

import {Options} from '@models/options_model';
import {SubmitDataModel} from '@models/passport_model';

import s from './index.module.scss';

type InputFormProps = {
    label?: any;
    control: Control<SubmitDataModel, any>;
    options: Options[];
    onChange?: () => void;
    name: string;
    placeholder?: string;
    errors?: any;
    labelIcon?: any;
};

export const SelectForm: React.FC<InputFormProps> = ({
    label,
    control,
    options,
    onChange,
    name,
    placeholder,
    errors,
    labelIcon,
}) => {
    return (
        <div className={s.inputWrapper}>
            <div className={s.labelDiv}>
                {labelIcon && labelIcon}
                <span className={s.inputLabel}>{label}</span>
            </div>
            <SelectTemplate
                control={control}
                name={name}
                options={options}
                onChange={onChange}
                placeholder={placeholder}
                errors={errors}
                width="186px"
            />
        </div>
    );
};
