import React, {CSSProperties} from 'react';

import RoutesIcon from '@images/routes_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <RoutesIcon className={className} style={style} />;
