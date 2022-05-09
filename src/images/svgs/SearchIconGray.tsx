import React, {CSSProperties} from 'react';

import SearchIconGray from '@images/search_icon_gray.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <SearchIconGray className={className} style={style} />
);
