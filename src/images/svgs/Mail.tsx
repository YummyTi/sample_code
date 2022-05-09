import React, {CSSProperties} from 'react';

import MailIcon from '@images/mail.component.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <MailIcon className={className} style={style} />;
