import React, {CSSProperties} from 'react';

import ModelsIcon from '@images/models_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <ModelsIcon className={className} style={style} />;
