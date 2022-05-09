import React, {CSSProperties} from 'react';

import AccessRightsIcon from '@images/access_rights_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => (
    <AccessRightsIcon className={className} style={style} />
);
