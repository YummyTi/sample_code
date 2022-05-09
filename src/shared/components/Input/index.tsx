import {TextField} from '@mui/material';
import cx from 'classnames';
import React, {ReactNode} from 'react';

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
    disabled?: boolean;
    multiline?: boolean;
    value?: any;
    sx: any;
}

const InputM = React.forwardRef<HTMLInputElement, Partial<IProps>>(
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
            disabled = false,
            value,
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
                className={cx(className, styles.input, [
                    disabled && styles.disabled,
                ])}
                placeholder={placeholder}
                inputRef={inputRef}
                defaultValue={defaultValue}
                disabled={disabled}
                helperText={message}
                InputLabelProps={{shrink: props.field.value ? true : false}}
                InputProps={{
                    endAdornment: endAdornment,
                    ref: ref,
                    autoComplete: 'new-password',
                    multiline: multiline,
                    // readOnly: disabled,
                    rows: multiline ? 3 : 1,
                    inputProps: {
                        min: 0,
                    },
                }}
                {...props.field}
                {...props.register}
                sx={props.sx}
            />
        );
    },
);

export default React.memo(InputM);
