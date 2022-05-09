import React, {CSSProperties} from 'react';

import EditIcon from '@images/edit__icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <EditIcon className={className} style={style} />;
