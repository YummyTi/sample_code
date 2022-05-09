import React, {CSSProperties} from 'react';

import ActivePolygon from '@images/Sidebar/activePolygon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ActivePolygon className={className} style={style} />;
