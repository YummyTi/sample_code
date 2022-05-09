import React, {CSSProperties} from 'react';

import ActivePoint from '@images/Sidebar/activePoint.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ActivePoint className={className} style={style} />;
