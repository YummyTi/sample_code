import React, {CSSProperties} from 'react';

import Visibility from '@images/visible_password.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <Visibility className={className} style={style} />;
