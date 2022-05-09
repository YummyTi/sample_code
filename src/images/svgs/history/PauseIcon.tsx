import React, {CSSProperties} from 'react';

import PauseIcon from '@images/History/pause.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <PauseIcon className={className} style={style} />;
