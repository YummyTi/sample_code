import React, {CSSProperties} from 'react';

import PaginationIcon from '@images/paginationIcon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <PaginationIcon className={className} style={style} />
);
