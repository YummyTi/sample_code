import React, {CSSProperties} from 'react';

import IconPlusRound from '@images/icon_plus_round.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <IconPlusRound className={className} style={style} />;
