import React, {CSSProperties} from 'react';

import AvatarIcon from '@images/avatar.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <AvatarIcon className={className} style={style} />;
