import React, {CSSProperties} from 'react';

import MenuIcon from '@images/menu.component.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <MenuIcon className={className} style={style} />;
