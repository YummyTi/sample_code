import React, {CSSProperties} from 'react';

import HistoryIcon from '@images/history__ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <HistoryIcon className={className} style={style} />;
