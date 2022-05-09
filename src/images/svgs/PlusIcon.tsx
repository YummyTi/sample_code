import React, {CSSProperties} from 'react';

import PlusIcon from '@images/plus.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <PlusIcon className={className} style={style} />;
