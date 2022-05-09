import React, {CSSProperties} from 'react';

import SeettingsIcon from '@images/settings.component.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <SeettingsIcon className={className} style={style} />;
