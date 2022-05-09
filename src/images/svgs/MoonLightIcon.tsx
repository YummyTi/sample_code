import React, {CSSProperties} from 'react';

import MoonLightIcon from '@images/moonlight__ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <MoonLightIcon className={className} style={style} />;
