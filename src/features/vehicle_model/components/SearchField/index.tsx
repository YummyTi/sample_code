import CircularProgress from '@mui/material/CircularProgress';
import cx from 'classnames';
import React from 'react';

import SearchPage from '@src/shared/components/SearchPage';
import {useBusModelStore} from '@src/shared/store/bus_model';

import styles from './index.module.scss';

interface IProps {
    isFetching: boolean;
}

const SearchField = ({isFetching}: Partial<IProps>) => {
    const setText = useBusModelStore((state) => state.setSearchTerm);
    const text = useBusModelStore((state) => state.term);
    const handleTextChange = (e: any) => {
        const searchText = e.target.value;
        setText(searchText[0] === ' ' ? e.target.value.trim() : e.target.value);
    };

    return (
        <div className={cx('flex__start', styles.container)}>
            <SearchPage handleTextChange={handleTextChange} text={text} />
            {isFetching && <CircularProgress size={20} />}
        </div>
    );
};

export default SearchField;
