import React, {CSSProperties} from 'react';

import ChevronRightIcon from '@images/chevron_right.component.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <ChevronRightIcon className={className} style={style} />
);
