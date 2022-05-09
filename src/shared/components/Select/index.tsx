import React from 'react';
import {components} from 'react-select';
import Select from 'react-select';

import ArrowDowIcon from '@src/images/svgs/ArrowDowIcon';

import {customStyle} from './constants';
import styles from './index.module.scss';
import {Container, Message} from './style';
//types
import {Props} from './type';

const MultiSelect = ({
    iconmargin,
    nooptionsmessage,
    icon,
    iconleft,
    iconright,
    icondowncolor,
    ...props
}: Props) => {
    const DropdownIndicator = (iconProps: any) => {
        return (
            <components.DropdownIndicator data-cy={props.dataCy} {...iconProps}>
                {props.IconDown ? (
                    props.IconDown
                ) : (
                    <ArrowDowIcon className={styles.arrowDown} />
                )}
            </components.DropdownIndicator>
        );
    };

    const NoOptionsMessage = (props: any) => {
        return (
            <components.NoOptionsMessage data-cy={props.dataCy} {...props}>
                <span className="custom-css-class">{nooptionsmessage}</span>
            </components.NoOptionsMessage>
        );
    };

    const ValueContainer = (props: any) => {
        return (
            components.ValueContainer && (
                <components.ValueContainer data-cy={props.dataCy} {...props}>
                    {icon && (
                        <div
                            style={{
                                position: 'absolute',
                                left: iconleft,
                                right: iconright,
                            }}
                        >
                            {icon}
                        </div>
                    )}
                    {props.children}
                </components.ValueContainer>
            )
        );
    };

    return (
        <Container
            fontSize={props.fontSize}
            width={props.width}
            margin={props.margin}
        >
            <Select
                styles={customStyle(props)}
                components={{
                    DropdownIndicator,
                    NoOptionsMessage,
                    ValueContainer,
                }}
                inputId={props.label}
                selectStyle={props.selectStyle}
                defaultValue={props.defaultValue}
                isOptionDisabled={props.isOptionDisabled}
                value={props.value}
                isDisabled={props.isDisabled}
                data-cy={props.dataCy}
                isSearchable={props.isSearchable}
                {...props}
                {...props.field}
                placeholder={props.placeholder ?? ''}
                menuPortalTarget={props.menuPortalTarget}
            />
            {props.error ? (
                <Message
                    isStatic={props.isStatic}
                    labelStyle={props.labelStyle}
                >
                    {props.message}
                </Message>
            ) : null}
        </Container>
    );
};

export default MultiSelect;
