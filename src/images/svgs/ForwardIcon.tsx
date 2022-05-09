import React, {CSSProperties} from 'react';

import ForwardIcon from '@images/forward_ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ForwardIcon className={className} style={style} />;
