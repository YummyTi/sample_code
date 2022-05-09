import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';

import {useGetAllKpps} from '@src/shared/api/kpp/useGetAllKpps';
import usePark from '@src/shared/api/park/hooks';
import {usePassportData} from '@src/shared/api/passport/hooks';
import {useRouteNames} from '@src/shared/api/route_names/hooks';
import {useRouteType} from '@src/shared/api/route_type/hooks';
import {SubmitDataModel} from '@src/shared/models/passport_model';

import {helper} from '@shared/helpers';

dayjs.extend(objectSupport);

const {handleOption} = helper;

interface ParkModel {
    parkData: {
        garage_name: string;
        license_number: string;
        park: string;
        park_id: number;
        remark: string;
    }[];
}

type RouteNames = {
    routeNames: string[];
};

export const usePassport = () => {
    const {state} = useLocation() as any;
    const {passportData} = usePassportData(state?.routeId);
    const {parkData}: ParkModel = usePark();
    const {routeType} = useRouteType();
    const {kppsData} = useGetAllKpps();
    const {routeNames}: RouteNames = useRouteNames();

    const parkOptions = useMemo(
        () => handleOption(parkData, 'park', 'park_id'),
        [parkData],
    );

    const routeTypeOptions = useMemo(
        () => handleOption(routeType),
        [routeType],
    );

    const kppsOptions = useMemo(() => handleOption(kppsData), [kppsData]);

    const routeNameOptions = useMemo(
        () => routeNames?.map((item) => ({label: item, value: item})),
        [routeNames],
    );

    const passportValues: SubmitDataModel = useMemo(
        () => ({
            ...passportData,
            park: parkOptions?.find(
                (park) => park.label === passportData?.park,
            ),
            route_name: routeNameOptions?.find(
                (routeName) => routeName.label === passportData?.route_name,
            ),
            route_type: routeTypeOptions?.find(
                (type) => type.label === passportData?.route_type,
            ),
            kpp1: kppsOptions?.find(
                (kpp) => kpp.value === passportData?.kpp1_id,
            ),
            kpp2: kppsOptions?.find(
                (kpp) => kpp.value === passportData?.kpp2_id,
            ),
        }),
        [
            passportData,
            parkOptions,
            routeTypeOptions,
            routeNameOptions,
            kppsOptions,
        ],
    );

    const handleTimeStamp = (time: any) => {
        const parsedTime = time.split(':');
        //@ts-ignore
        return dayjs({hour: +parsedTime[0], minute: +parsedTime[1]}).unix();
    };

    const handleSaveData = (data: SubmitDataModel) => {
        const saveData = {
            park_id: data.park?.value,
            route_type: data.route_type?.value,
            route_name: data.route_name?.value,
            station_kpp1: data.kpp1?.value,
            station_kpp2: data.kpp2?.value,
            dist_kpp1_to_kpp2: data.distkpp1kpp2,
            dist_kpp2_to_kpp1: data.distkpp2kpp1,
            time_kpp1_to_kpp2: data.vremyakpp1kpp2,
            time_kpp2_to_kpp1: data.vremyakpp2kpp1,
            dist_kpp1_from_garage: data.distparkkpp1,
            dist_kpp2_from_garage: data.distparkkpp2,
            time_to_kpp1_f_gar: data.vremyaparkkpp1,
            time_to_kpp2_f_gar: data.vremyaparkkpp2,
            wait_time_kpp1: data.prostoykpp1,
            wait_time_kpp2: data.prostoykpp2,
            start_time_rush_hour_morning: data.utrenniypikbegin,
            start_time_rush_hour_dinner: data.utrenniypikend,
            end_time_rush_hour_morning: data.vecherniypikbegin,
            end_time_rush_hour_dinner: data.vecherniypikend,
            remark: data?.remark || '',
        };
        return saveData;
    };

    return {
        parkOptions,
        routeTypeOptions,
        kppsOptions,
        routeNameOptions,
        passportValues,
        handleSaveData,
    };
};
