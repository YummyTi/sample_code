// import i18n from '@shared/localization/i18n';
import i18next from 'i18next';

export let menuItems: any = [];
export let userRoutes: any = [];

i18next.on('languageChanged', function (lng) {
    menuItems = [
        {
            path: '/manage/main',
            text: i18next.t('main'),
        },
        {
            path: '/manage/main/roles',
            text: i18next.t('roles'),
        },
    ];

    userRoutes = [
        {
            path: '/manage/main',
            text: i18next.t('main'),
        },
    ];
});
