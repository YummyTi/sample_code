import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import ActiveBusIcon from '@src/images/svgs/ActiveBusIcon';
import ActiveRouteIcon from '@src/images/svgs/ActiveRouteIcon';
import BusIcon from '@src/images/svgs/BusIcon';
import RoadIcon from '@src/images/svgs/RoadIcon';

export const useAlertRoutes = () => {
    const {t} = useTranslation();

    return useMemo(
        () => [
            {
                Icon: RoadIcon,
                ActiveIcon: ActiveRouteIcon,
                text: t('prostoy'),
                path: 'prostoy',
            },
            {
                Icon: BusIcon,
                ActiveIcon: ActiveBusIcon,
                text: t('interval_page'),
                path: 'interval',
            },
        ],
        [t],
    );
};
