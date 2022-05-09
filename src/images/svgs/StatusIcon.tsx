import React, {CSSProperties} from 'react';

import StatusIcon from '@images/status_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <StatusIcon className={className} style={style} />;
