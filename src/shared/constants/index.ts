import i18n from '@src/shared/localization/i18n';

export enum TOKEN {
    AUTH_TOKEN = 'AUTH_TOKEN_FRONT',
    ROLE_NAME = 'ROLE_NAME_FRONT',
    PERMISSIONS = 'PERMISSIONS_FRONT',
}

export enum PERMISSION {
    PARK = 'PARK',
    USER = 'USER',
    MANAGEMENT = 'MANAGEMENT',
    POLYGON = 'POLYGON',
    BUS = 'BUS',
    REPORT = 'REPORT',
    MODEL = 'MODEL',
    ROUTE = 'ROUTE',
    POINT_TYPE = 'POINT_TYPE',
    BUS_MAP_GOOGLE = 'BUS_MAP_GOOGLE',
    CHECKUP = 'CHECKUP',
    CHANGE_BUS_STATUS = 'CHANGE_BUS_STATUS',
    FUELING = 'FUELING',
    MSCHEDULE = 'MSCHEDULE',
    HISTORY = 'HISTORY',
    LOGGING = 'LOGGING',
    UTILITIES = 'UTILITIES',
    CHAT_TEMPLATE = 'CHAT_TEMPLATE',
}

export enum PermissionEnum {
    automobile = 'automobile',
    transports = 'transports',
    vehicle_model = 'transports',
    routes = 'routes',
    checkpoints = 'checkpoints',
    polygons = 'polygons',
    order = 'order',
    races_fuel = 'races_fuel',
    main = 'main',
    statistic = 'statistics',
    logs = 'logs',
    role = 'role',
    region = 'region',
}

// field validation
export const requireText = i18n.t('requiredFields');
export const confirmError = i18n.t('confirm_password_incorrect');
export const moreError = i18n.t('more_than_min');

export const handleMinimal = (count: number) => {
    return i18n.t('minimal_character_length', {length: count});
};

export enum DAYS {
    MONDAY = 'pon',
    SATURDAY = 'sub',
    SUNDAY = 'vos',
    OTHER = 'bud',
}

export enum VERSION {
    V1 = 1.0,
}
