import React, {CSSProperties} from 'react';

import RouteIcon from '@images/route_ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <RouteIcon className={className} style={style} />;
