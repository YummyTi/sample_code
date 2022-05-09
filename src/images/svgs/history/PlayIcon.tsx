import React, {CSSProperties} from 'react';

import PlayIcon from '@images/History/play.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <PlayIcon className={className} style={style} />;
