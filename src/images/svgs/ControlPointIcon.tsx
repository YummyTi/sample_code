import React, {CSSProperties} from 'react';

import ControlPointIcon from '@images/control_point_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <ControlPointIcon className={className} style={style} />
);
