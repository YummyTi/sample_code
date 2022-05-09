import React, {CSSProperties} from 'react';

import ArrowForward from '@images/arrowForward.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ArrowForward className={className} style={style} />;
