import React, {CSSProperties} from 'react';

import AddPrimaryIcon from '@images/add_primary_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <AddPrimaryIcon className={className} style={style} />
);
