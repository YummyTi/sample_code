import React, {CSSProperties} from 'react';

import LokBusFirst from '@images/location_bus1.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <LokBusFirst className={className} style={style} />;
