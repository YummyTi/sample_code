import React, {CSSProperties} from 'react';

import ActiveDynamicMap from '@images/Sidebar/activeDynamicMap.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <ActiveDynamicMap className={className} style={style} />
);
