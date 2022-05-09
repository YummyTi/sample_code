import React, {CSSProperties} from 'react';

import ExitCloseIcon from '@images/close_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ExitCloseIcon className={className} style={style} />;
