import React, {CSSProperties} from 'react';

import LabIcon from '@images/lab_energy_icon.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <LabIcon className={className} style={style} />;
