import React, {CSSProperties} from 'react';

import DoubleArrowBackIcon from '@images/double_arrow_back.component.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <DoubleArrowBackIcon className={className} style={style} />
);
