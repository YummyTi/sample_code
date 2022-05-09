import React, {CSSProperties} from 'react';

import Protocol from '@images/EditVehicleRoute/protocol.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <Protocol className={className} style={style} />;
