import React, {CSSProperties} from 'react';

import EditIc from '@images/edit__ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <EditIc className={className} style={style} />;
