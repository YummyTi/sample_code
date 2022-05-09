import React from 'react';

import NavigationBar from '@src/shared/components/NavigationBar';

interface IProps {
    children?: any;
    list?: {path?: string; text?: string}[];
}

const Innerlayout = ({list, children}: IProps) => {
    return (
        <div className="page__wrapper">
            <NavigationBar
                padding="0 15px 0 25px"
                margin="10px 0"
                list={list}
            />
            {children}
        </div>
    );
};

export default Innerlayout;
