import React, {CSSProperties} from 'react';

import ActiveUtility from '@images/Sidebar/activeUtility.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ActiveUtility className={className} style={style} />;
