import React, {CSSProperties} from 'react';

import RoundedBasket from '@images/roundedbasket_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <RoundedBasket className={className} style={style} />;
