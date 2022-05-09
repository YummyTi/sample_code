import React from 'react';
import {Controller} from 'react-hook-form';

import MultiSelect from '../Select';
import {Props} from '../Select/type';
import styles from './index.module.scss';

interface IProps extends Props {
    errors: any;
    styles: any;
    control: any;
    type: any;
    name: any;
    required: boolean;
    placeholder: string;
    label: string;
    emptyMsg: string;
    message: any;
    isLoading: boolean;
    options: {label?: string; value?: any}[];
    isMulti: boolean;
    isDisabled: boolean;
    defaultValue: any;
}

const SelectController = ({
    control,
    errors,
    name,
    required,
    placeholder,
    label,
    emptyMsg,
    message,
    isLoading,
    options,
    isMulti,
    isDisabled,
    defaultValue,
    ...props
}: Partial<IProps>) => {
    return (
        <Controller
            control={control}
            defaultValue={defaultValue}
            name={name}
            rules={{
                required: required,
            }}
            render={({field}) => {
                return (
                    <MultiSelect
                        isLoading={isLoading}
                        options={options}
                        isMulti={isMulti}
                        defaultValue={defaultValue}
                        label={label}
                        isDisabled={isDisabled}
                        margin={{
                            laptop: '0',
                        }}
                        placeholder={placeholder}
                        message={message?.value?.message}
                        error={errors}
                        field={field}
                        isClearable={false}
                        nooptionsmessage={emptyMsg}
                        isStatic
                        {...props}
                    />
                );
            }}
        />
    );
};

export default React.memo(SelectController);
