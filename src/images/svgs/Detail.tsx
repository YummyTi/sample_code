import React, {CSSProperties} from 'react';

import Detail from '@images/EditVehicleRoute/Detail.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <Detail className={className} style={style} />;
