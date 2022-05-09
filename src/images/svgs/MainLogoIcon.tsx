import React, {CSSProperties} from 'react';

import MainLogoIcon from '@images/mainLogo.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <MainLogoIcon className={className} style={style} />;
