import React, {CSSProperties} from 'react';

import OperationalAccountIcon from '@images/operational_account_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <OperationalAccountIcon className={className} style={style} />
);
