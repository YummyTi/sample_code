import React, {CSSProperties} from 'react';

import WhitePlusIcon from '@images/white_btn.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <WhitePlusIcon className={className} style={style} />;
