import {Button, Input} from '@mui/material';
import React from 'react';
import {useEffect, useRef, useState} from 'react';

import DoubleChevronRight from '@src/images/svgs/DoubleChevronRight';
import PaginationIcon from '@src/images/svgs/PaginationIcon';

import styles from './index.module.scss';

interface IProps {
    totalCount: number;
    currentPage: number;
    disabled?: boolean;
    onChange: (int: number) => void;
}
const MuiPagination: React.FC<IProps> = ({
    totalCount,
    currentPage,
    onChange,
    disabled,
}) => {
    const [localPage, setLocalPage] = useState<number | string>(currentPage);

    let timeoutId: any = useRef<any | null>(null);

    const handleChange = (e: any) => {
        const value = e.target.value;
        console.log(value, 'value');
        if (value)
            if ((value !== '' && value < 1) || value > totalCount) {
                return;
            }

        setLocalPage(value);

        if (value) {
            timeoutId = setTimeout(() => {
                onChange(value);
            }, 1000);
        }
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const nexPage = () => {
        if (localPage > totalCount) {
            setLocalPage(Number(totalCount));
            onChange(Number(totalCount));
        } else {
            setLocalPage(Number(localPage) + 1);
            onChange(Number(localPage) + 1);
        }
    };

    const prevPage = () => {
        setLocalPage(Number(localPage) - 1);
        onChange(Number(localPage) - 1);
    };

    return (
        <div className={styles.wrapper}>
            <span className="text">Страница</span>
            <Input
                className={styles.input}
                onFocus={() => {
                    setLocalPage('');
                }}
                onBlur={() => {
                    if (!localPage) {
                        setLocalPage(currentPage);
                    }
                }}
                type="number"
                onChange={handleChange}
                value={localPage}
            />
            <span className="text">из {totalCount}</span>
            <Button
                className={styles.button}
                onClick={prevPage}
                disabled={currentPage == 1}
            >
                <PaginationIcon />
            </Button>
            <Button
                disabled={disabled}
                className={styles.button}
                onClick={nexPage}
            >
                <DoubleChevronRight />
            </Button>
        </div>
    );
};

export default React.memo(MuiPagination);
