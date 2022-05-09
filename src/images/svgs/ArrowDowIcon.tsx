import React, {CSSProperties} from 'react';

import ArrowDownIcon from '@images/arrow__down__ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ArrowDownIcon className={className} style={style} />;
