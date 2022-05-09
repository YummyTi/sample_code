import React, {CSSProperties} from 'react';

import DeleteLobby from '@images/delete_lobby.svg';

export default ({
    style,
    className,
}: {
    style?: CSSProperties;
    className?: string;
}): React.ReactElement => <DeleteLobby className={className} style={style} />;
