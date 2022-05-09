import React, {CSSProperties} from 'react';

import GeneralMenuIcon from '@images/menu__ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <GeneralMenuIcon className={className} style={style} />
);
