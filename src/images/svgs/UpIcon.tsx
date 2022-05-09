import React, {CSSProperties} from 'react';

import UpIcon from '@images/up.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <UpIcon className={className} style={style} />;
