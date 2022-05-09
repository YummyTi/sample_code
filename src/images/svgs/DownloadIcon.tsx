import React, {CSSProperties} from 'react';

import DownloadIcon from '@images/download__ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <DownloadIcon className={className} style={style} />;
