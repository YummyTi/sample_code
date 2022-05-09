import React, {CSSProperties} from 'react';

import Scheme from '@images/EditVehicleRoute/scheme.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <Scheme className={className} style={style} />;
