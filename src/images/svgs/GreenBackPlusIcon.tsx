import React, {CSSProperties} from 'react';

import GreenBackPlusIcon from '@images/green_back_plus_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <GreenBackPlusIcon className={className} style={style} />
);
