import React, {CSSProperties} from 'react';

import ActiveAccessright from '@images/Sidebar/activeAccessRight.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <ActiveAccessright className={className} style={style} />
);
