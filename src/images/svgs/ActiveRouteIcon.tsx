import React, {CSSProperties} from 'react';

import ActiveRouteIcon from '@images/Sidebar/activeRoute.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <ActiveRouteIcon className={className} style={style} />
);
