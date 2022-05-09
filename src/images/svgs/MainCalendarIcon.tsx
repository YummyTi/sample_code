import React, {CSSProperties} from 'react';

import MainCalendarIcon from '@images/calendar_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <MainCalendarIcon className={className} style={style} />
);
