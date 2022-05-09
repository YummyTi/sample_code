import CircularProgress from '@mui/material/CircularProgress';
import cx from 'classnames';
import React from 'react';

import SearchPage from '@src/shared/components/SearchPage';

import styles from './index.module.scss';

interface IProps {
    isFetching: boolean;
    text: string;
    placeholder: string;
    handleTextChange: (e: any) => void;
}

const SearchField = ({
    isFetching,
    text,
    placeholder,
    handleTextChange,
}: Partial<IProps>) => {
    return (
        <div className={cx('flex__start', styles.container)}>
            <SearchPage
                placeholder={placeholder}
                handleTextChange={handleTextChange}
                text={text}
            />
            {isFetching && <CircularProgress size={20} />}
        </div>
    );
};

export default React.memo(SearchField);
