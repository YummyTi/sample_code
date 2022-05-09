import React, {CSSProperties} from 'react';

import IconBus from '@images/icon_bus.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <IconBus className={className} style={style} />;
