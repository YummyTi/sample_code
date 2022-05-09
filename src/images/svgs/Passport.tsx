import React, {CSSProperties} from 'react';

import Passport from '@images/EditVehicleRoute/Passport.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <Passport className={className} style={style} />;
