import React, {CSSProperties} from 'react';

import PolygonIcon from '@images/polygon_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <PolygonIcon className={className} style={style} />;
