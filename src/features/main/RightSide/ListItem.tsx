import React from 'react';

interface IProps {
    title: string;
    value: string | number;
}

const ListItem = ({title, value}: IProps) => {
    return (
        <div className="listItem">
            <div className="listItem__title">{title}: </div>
            <div className="listItem__value">{value}</div>
        </div>
    );
};

export default ListItem;
