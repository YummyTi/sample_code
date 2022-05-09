import {TextField} from '@mui/material';
import cx from 'classnames';
import React, {ReactNode} from 'react';
import MaskInput from 'react-maskinput';

import styles from './index.module.scss';

interface IProps {
    error?: any;
    field?: any;
    register?: any;
    // value?: any;
    // onChange?: ((e: any) => void) | any;
    type?: 'text' | 'password' | 'number' | 'tel' | 'time';
    label?: string;
    fullWidth?: boolean;
    defaultValue?: string;
    className?: any;
    size?: 'small' | 'medium';
    endAdornment?: ReactNode;
    placeholder: string;
    inputRef: any;
    message: string;
    multiline?: boolean;
}

const CustomMask = (props: any) => {
    return (
        <MaskInput
            alwaysShowMask
            maskString="00 000 AAA"
            mask="00 000 aaa"
            {...props}
        />
    );
};

const InputMaskM = React.forwardRef<HTMLInputElement, Partial<IProps>>(
    (
        {
            className,
            error,
            // value,
            type,
            fullWidth = false,
            label,
            size,
            endAdornment,
            placeholder,
            inputRef,
            message,
            multiline,
            defaultValue,
            // onChange,
            ...props
        },
        ref,
    ) => {
        return (
            <TextField
                {...props}
                error={error}
                type={type}
                label={label}
                fullWidth={fullWidth}
                size={size}
                className={cx(className, styles.input)}
                placeholder={placeholder}
                inputRef={inputRef}
                defaultValue={defaultValue}
                helperText={message}
                InputLabelProps={{shrink: props.field.value ? true : false}}
                InputProps={{
                    inputComponent: CustomMask,
                    endAdornment: endAdornment,
                    ref: ref,
                    autoComplete: 'new-password',
                    multiline: multiline,
                    rows: multiline ? 3 : 1,
                }}
                {...props.field}
                {...props.register}
            />
        );
    },
);

export default React.memo(InputMaskM);
