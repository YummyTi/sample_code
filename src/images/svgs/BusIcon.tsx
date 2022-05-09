import React, {CSSProperties} from 'react';

import BusIcon from '@images/bus_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <BusIcon className={className} style={style} />;
