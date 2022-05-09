import React, {CSSProperties} from 'react';

import ActiveDifference from '@images/Sidebar/activeDifference.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <ActiveDifference className={className} style={style} />
);
