import React, {CSSProperties} from 'react';

import CellHotspotIcon from '@images/cellHotspot.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <CellHotspotIcon className={className} style={style} />
);
