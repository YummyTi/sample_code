import React, {CSSProperties} from 'react';

import DynamicMapIcon from '@images/dynamic_map_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <DynamicMapIcon className={className} style={style} />
);
