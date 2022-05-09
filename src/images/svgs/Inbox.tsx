import React, {CSSProperties} from 'react';

import InboxIcon from '@images/inbox.component.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <InboxIcon className={className} style={style} />;
