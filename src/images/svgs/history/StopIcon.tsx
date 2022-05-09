import React, {CSSProperties} from 'react';

import StopIcon from '@images/History/stop.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <StopIcon className={className} style={style} />;
