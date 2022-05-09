import React, {CSSProperties} from 'react';

import ArrowDown from '@images/Header/Vector.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ArrowDown className={className} style={style} />;
