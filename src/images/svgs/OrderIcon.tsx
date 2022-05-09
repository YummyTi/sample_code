import React, {CSSProperties} from 'react';

import OrderIcon from '@images/order_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <OrderIcon className={className} style={style} />;
