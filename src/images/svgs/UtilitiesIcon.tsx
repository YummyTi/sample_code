import React, {CSSProperties} from 'react';

import UtilitiesIcon from '@images/utilities_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <UtilitiesIcon className={className} style={style} />;
