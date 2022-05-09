import i18next from 'i18next';

export let vehicleMenuItems: any = [];

i18next.on('languageChanged', function (lng) {
    vehicleMenuItems = [
        {
            path: '/manage/vehicle_model',
            text: i18next.t('main'),
        },
        {
            path: '/manage/vehicle_model/fule_types',
            text: i18next.t('fuel_types'),
        },
    ];
});
