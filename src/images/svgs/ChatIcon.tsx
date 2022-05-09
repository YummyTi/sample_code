import React, {CSSProperties} from 'react';

import ChatIcon from '@images/Sidebar/chat.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ChatIcon className={className} style={style} />;
