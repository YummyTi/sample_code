import React, {CSSProperties} from 'react';

import VisibileIcon from '@images/visibleIcon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <VisibileIcon className={className} style={style} />;
