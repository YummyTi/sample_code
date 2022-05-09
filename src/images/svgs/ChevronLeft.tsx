import React, {CSSProperties} from 'react';

import ChevronLeftIcon from '@images/chevron_left.component.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <ChevronLeftIcon className={className} style={style} />
);
