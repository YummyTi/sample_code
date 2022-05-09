import React, {CSSProperties} from 'react';

import WhiteTrashIcon from '@images/white_trash_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <WhiteTrashIcon className={className} style={style} />
);
