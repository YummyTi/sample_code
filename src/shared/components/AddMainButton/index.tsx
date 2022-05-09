import {Button} from '@mui/material';
import c from 'classnames';
import React from 'react';

import AddPrimaryIcon from '@src/images/svgs/AddPrimaryIcon';
import WhitePlusIcon from '@src/images/svgs/WhitePlusIcon';

import Container from '../container';
import styles from './index.module.scss';

interface IProps {
    children: any;
    onClick?: () => void;
    disabled?: boolean;
    primary?: boolean;
}

const AddMainButton = ({children, onClick, disabled, primary}: IProps) => {
    if (primary) {
        return (
            <div className="">
                <Button
                    variant="contained"
                    className={c('btn__primary', styles.btnPrimary)}
                    disabled={disabled}
                    onClick={onClick}
                >
                    <WhitePlusIcon />
                    {children}
                </Button>
            </div>
        );
    }

    return (
        <Container>
            <Button
                className={styles.btn}
                disabled={disabled}
                onClick={onClick}
            >
                <AddPrimaryIcon />
                {children}
            </Button>
        </Container>
    );
};

export default AddMainButton;
