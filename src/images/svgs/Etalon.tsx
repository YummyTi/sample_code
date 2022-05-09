import React, {CSSProperties} from 'react';

import Etalon from '@images/EditVehicleRoute/etalon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <Etalon className={className} style={style} />;
