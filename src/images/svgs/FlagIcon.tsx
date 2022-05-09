import React, {CSSProperties} from 'react';

import FlagIcon from '@images/flag_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <FlagIcon className={className} style={style} />;
