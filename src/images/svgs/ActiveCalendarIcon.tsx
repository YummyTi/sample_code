import React, {CSSProperties} from 'react';

import ActiveCalendar from '@images/Sidebar/activeCalendar.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <ActiveCalendar className={className} style={style} />
);
