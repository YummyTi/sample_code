import React, {CSSProperties} from 'react';

import DaySunnyIcon from '@images/day_sunny__ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <DaySunnyIcon className={className} style={style} />;
