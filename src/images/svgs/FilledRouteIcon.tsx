import React, {CSSProperties} from 'react';

import FilledRouteIcon from '@images/filledRoute.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <FilledRouteIcon className={className} style={style} />
);
