import React, {CSSProperties} from 'react';

import ActiveOrder from '@images/Sidebar/activeOrder.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ActiveOrder className={className} style={style} />;
