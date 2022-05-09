import React, {CSSProperties} from 'react';

import CopyIcon from '@images/copy_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <CopyIcon className={className} style={style} />;
