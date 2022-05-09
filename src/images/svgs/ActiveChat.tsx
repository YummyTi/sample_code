import React, {CSSProperties} from 'react';

import ActiveChat from '@images/Sidebar/activeChat.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ActiveChat className={className} style={style} />;
