import React, {CSSProperties} from 'react';

import LokBus from '@images/location_bus.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <LokBus className={className} style={style} />;
