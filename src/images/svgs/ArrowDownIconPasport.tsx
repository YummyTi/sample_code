import React, {CSSProperties} from 'react';

import PassportDownIcon from '@images/passport_down_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <PassportDownIcon className={className} style={style} />
);
