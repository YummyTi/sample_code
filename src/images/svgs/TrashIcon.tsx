import React, {CSSProperties} from 'react';

import TrashIcon from '@images/trash_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <TrashIcon className={className} style={style} />;
