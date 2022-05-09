import React, {CSSProperties} from 'react';

import BtnPlusIcon from '@images/btn_plus_ic.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <BtnPlusIcon className={className} style={style} />;
