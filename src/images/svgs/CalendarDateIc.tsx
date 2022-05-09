import React, {CSSProperties} from 'react';

import CalendarDateIc from '@images/calendar_date.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <CalendarDateIc className={className} style={style} />
);
