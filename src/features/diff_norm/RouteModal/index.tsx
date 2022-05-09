import React from 'react';
import shallow from 'zustand/shallow';

import DialogWrapper from '@src/shared/components/CustomDialog';

import {useDiffNormStore} from '@store/race_fuel';

import TableInstance from '../TableTemplate';
import s from './index.module.scss';
import {useRouteModalHook} from './model';

const RouteModal = () => {
    const {isRouteOpen, setRouteOpen, routeData, editRouteData} =
        useDiffNormStore((state) => state, shallow);

    const {data, columns, handleSubmit, handleSave} = useRouteModalHook();

    return (
        <DialogWrapper
            open={isRouteOpen}
            onClose={setRouteOpen}
            title={routeData.route_name}
            save={handleSubmit}
            isLoading={handleSave.isLoading}
            contentStyles={s.dcontent}
        >
            <TableInstance
                columns={columns}
                data={data}
                setData={editRouteData}
            />
        </DialogWrapper>
    );
};

export default React.memo(RouteModal);
