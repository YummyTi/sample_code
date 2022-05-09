import React, {CSSProperties} from 'react';

import ActiveCopy from '@images/Sidebar/activeCopy.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ActiveCopy className={className} style={style} />;
