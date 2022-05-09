import React, {CSSProperties} from 'react';

import SuccessIcon from '@images/success_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <SuccessIcon className={className} style={style} />;
