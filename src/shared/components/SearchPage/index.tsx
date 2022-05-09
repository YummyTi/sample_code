import TextField from '@mui/material/TextField';
import React from 'react';

import SearchIcon from '@src/images/svgs/SearchIcon';
import Container from '@src/shared/components/container';

import styles from './index.module.scss';

interface IProps {
    text: string;
    placeholder: string;
    handleTextChange: (e: any) => void;
}

const SearchPage = ({
    text,
    placeholder = 'Поиск по имени, номеру или описанию',
    handleTextChange,
}: Partial<IProps>) => {
    return (
        <Container>
            <TextField
                InputProps={{
                    startAdornment: (
                        <div className={styles.searchStyle}>
                            <SearchIcon />
                        </div>
                    ),
                }}
                value={text}
                name="textSearch"
                onChange={handleTextChange}
                placeholder={placeholder}
                className={styles.textField}
                size="small"
                type="search"
            />
        </Container>
    );
};

export default SearchPage;
