import Button from '@mui/material/Button';
import cx from 'classnames';
import React, {ReactNode} from 'react';

import styles from './index.module.scss';

interface IProps {
    text: string;
    className?: string;
    icon?: any;
    onClick?: () => void;
}

const CMButton = ({text, className, icon, onClick}: IProps) => {
    return (
        <Button onClick={onClick} className={cx(className, styles.baseBtn)}>
            {icon}
            {text}
        </Button>
    );
};

export default CMButton;
