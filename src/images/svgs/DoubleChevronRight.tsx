import React, {CSSProperties} from 'react';

import ChevronRightIcon from '@images/ic_chevron_right.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <ChevronRightIcon className={className} style={style} />
);
