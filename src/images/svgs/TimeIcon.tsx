import React, {CSSProperties} from 'react';

import TimeIcon from '@images/time__ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <TimeIcon className={className} style={style} />;
