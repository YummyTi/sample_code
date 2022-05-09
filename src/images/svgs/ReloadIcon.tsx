import React, {CSSProperties} from 'react';

import ReloadIcon from '@images/reload.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ReloadIcon className={className} style={style} />;
