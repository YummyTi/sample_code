import React, {CSSProperties} from 'react';

import ActiveFlag from '@images/Sidebar/activeFlag.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ActiveFlag className={className} style={style} />;
