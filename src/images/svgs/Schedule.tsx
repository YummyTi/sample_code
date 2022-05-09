import React, {CSSProperties} from 'react';

import Schedule from '@images/EditVehicleRoute/etalon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <Schedule className={className} style={style} />;
