import React, {CSSProperties} from 'react';

import CalendarIcon from '@images/calendar__ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <CalendarIcon className={className} style={style} />;
