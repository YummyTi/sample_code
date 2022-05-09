import {useMutation} from 'react-query';

import {queryClient} from '@shared/helpers/constants';
import {useRouteStepStore} from '@store/route_step';

import {deleteRoute, savePassport} from './index';

const useHandleRoute = () => {
    const setStep = useRouteStepStore((state) => state.setRouteId);

    const handleSavePassport = useMutation((data: any) => savePassport(data), {
        onSuccess: (data) => {
            setStep(data.data.data);
        },
    });

    const handleDeleteRoute = useMutation(
        (route_id: number) => deleteRoute(route_id),
        {
            onSuccess: (data) => {
                console.log(data, 'data');
                queryClient.invalidateQueries('routesP');
            },
        },
    );

    return {
        handleSavePassport,
        handleDeleteRoute,
    };
};

export default useHandleRoute;
