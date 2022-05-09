import React, {CSSProperties} from 'react';

import CloseIcon from '@images/close.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <CloseIcon className={className} style={style} />;
