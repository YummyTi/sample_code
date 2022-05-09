import React, {CSSProperties} from 'react';

import ExitIcon from '@images/exit.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ExitIcon className={className} style={style} />;
