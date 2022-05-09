import React, {CSSProperties} from 'react';

import RoadIcon from '@images/road_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <RoadIcon className={className} style={style} />;
