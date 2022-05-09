import React, {CSSProperties} from 'react';

import ActiveBusIcon from '@images/Sidebar/activeBusIcon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ActiveBusIcon className={className} style={style} />;
