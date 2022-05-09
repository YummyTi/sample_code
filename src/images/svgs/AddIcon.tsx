import React, {CSSProperties} from 'react';

import AddIcon from '@images/add_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <AddIcon className={className} style={style} />;
