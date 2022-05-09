import React, {CSSProperties} from 'react';

import SearchIcon from '@images/search.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <SearchIcon className={className} style={style} />;
