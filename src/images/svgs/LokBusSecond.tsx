import React, {CSSProperties} from 'react';

import LokBusSecond from '@images/location_bus2.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <LokBusSecond className={className} style={style} />;
