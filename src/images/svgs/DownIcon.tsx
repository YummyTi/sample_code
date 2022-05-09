import React, {CSSProperties} from 'react';

import DownIcon from '@images/arrowdown.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <DownIcon className={className} style={style} />;
