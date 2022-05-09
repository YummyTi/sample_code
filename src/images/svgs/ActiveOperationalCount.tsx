import React, {CSSProperties} from 'react';

import ActiveOperationalCount from '@images/Sidebar/activeOperationalCount.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <ActiveOperationalCount className={className} style={style} />
);
