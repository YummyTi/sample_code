import TextareaAutosize from '@mui/material/TextareaAutosize';
import React from 'react';
import {Controller} from 'react-hook-form';
import MaskInput from 'react-maskinput';

import InputM from '@src/shared/components/Input';
import InputMaskM from '@src/shared/components/MaskedInput';

interface IProps {
    errors: any;
    styles: any;
    control: any;
    inputRef: any;
    endAdornment: any;
    type: any;
    name: any;
    required: boolean;
    placeholder: string;
    size: 'small' | 'medium';
    label: string;
    message: string;
    textarea?: boolean;
    areaWidth?: any;
    multiline?: boolean;
    defaultValue?: any;
    masked?: boolean;
    mask?: string;
    maskString?: string;
    classNameMask?: any;
    disabled?: boolean;
    sx?: any;
    handleGettingData?: (e: any) => void;
}

{
    /* <MaskInput
                            alwaysShowMask
                            maskString={maskString}
                            // @ts-ignore
                            className={classNameMask}
                            mask={mask}
                            {...field}
                        /> */
}

const InputController = ({
    control,
    styles,
    inputRef,
    endAdornment,
    errors,
    type,
    name,
    required,
    placeholder,
    size,
    label,
    message,
    textarea,
    areaWidth = 200,
    multiline,
    defaultValue,
    masked,
    disabled,
    sx,
    mask = '00 000 aaa',
    maskString = '__ __ ___',
    classNameMask,
    handleGettingData,
}: Partial<IProps>) => {
    if (masked) {
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
                        <InputMaskM
                            field={field}
                            error={errors}
                            type={type}
                            defaultValue={defaultValue}
                            className={styles}
                            inputRef={inputRef}
                            size={size}
                            placeholder={placeholder}
                            endAdornment={endAdornment}
                            label={label}
                            message={message}
                            multiline={multiline}
                            fullWidth
                        />
                    );
                }}
            />
        );
    }
    if (textarea) {
        return (
            <Controller
                control={control}
                name={name}
                rules={{required: required}}
                render={({field}) => (
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        {...field}
                        placeholder={placeholder}
                        style={{...sx, width: areaWidth}}
                    />
                )}
            />
        );
    }
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
                    <InputM
                        field={field}
                        error={errors}
                        type={type}
                        defaultValue={defaultValue}
                        className={styles}
                        inputRef={inputRef}
                        size={size}
                        placeholder={placeholder}
                        endAdornment={endAdornment}
                        label={label}
                        message={message}
                        disabled={disabled}
                        multiline={multiline}
                        fullWidth
                        sx={sx}
                    />
                );
            }}
        />
    );
};

export default React.memo(InputController);
