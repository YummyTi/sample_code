import React, {CSSProperties} from 'react';

import LogoIcon from '@images/logoIcon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <LogoIcon className={className} style={style} />;
