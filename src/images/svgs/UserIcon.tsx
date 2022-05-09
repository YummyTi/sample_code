import React, {CSSProperties} from 'react';

import UserIcon from '@images/user.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <UserIcon className={className} style={style} />;
