import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {Options} from '@models/options_model';
import {selectStyles} from '@styles/components/helperStyles';

import SelectController from '../SelectController';

interface SelectTemplateProps {
    control: any;
    options: Options[];
    onChange?: () => void;
    name: string;
    placeholder?: string;
    errors?: any;
    width?: string;
}

const SelectTemplate: FC<SelectTemplateProps> = ({
    control,
    options,
    onChange,
    name,
    placeholder,
    errors,
    width = '167px',
}) => {
    const {t} = useTranslation();

    return (
        <div style={{width}}>
            <SelectController
                control={control}
                options={options}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                nooptionsmessage={t('no_options')}
                errors={errors?.[name]?.label?.type}
                message={errors?.[name]?.label?.message}
                {...selectStyles}
            />
        </div>
    );
};

export default SelectTemplate;
