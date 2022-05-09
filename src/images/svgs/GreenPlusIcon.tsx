import React, {CSSProperties} from 'react';

import GreenPlusIcon from '@images/green_plus_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <GreenPlusIcon className={className} style={style} />;
