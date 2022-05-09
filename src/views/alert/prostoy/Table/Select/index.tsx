import React, {FC} from 'react';

import MultiSelect from '@components/Select';
import {Options} from '@models/options_model';

import {styles} from './styles';

interface SelectProps {
    options: Options[];
    select?: () => void;
}

const Select: FC<SelectProps> = ({options, select}) => {
    return (
        <>
            <MultiSelect
                defaultValue={options[0]}
                options={options}
                {...styles}
            />
        </>
    );
};

export default Select;
