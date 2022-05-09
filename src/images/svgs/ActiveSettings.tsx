import React, {CSSProperties} from 'react';

import ActiveSettings from '@images/Sidebar/activeSettings.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <ActiveSettings className={className} style={style} />
);
