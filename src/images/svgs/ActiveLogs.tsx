import React, {CSSProperties} from 'react';

import ActiveLogs from '@images/Sidebar/activeLogs.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ActiveLogs className={className} style={style} />;
