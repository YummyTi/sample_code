import React, {CSSProperties} from 'react';

import PrintIcon from '@images/print.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <PrintIcon className={className} style={style} />;
