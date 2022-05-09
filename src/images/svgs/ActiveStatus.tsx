import React, {CSSProperties} from 'react';

import ActiveStatus from '@images/Sidebar/activeStatus.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ActiveStatus className={className} style={style} />;
