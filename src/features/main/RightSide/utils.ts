import i18n from '@shared/localization/i18n';

export const handleActive = (active: boolean | string) => {
    if (active) {
        return i18n.t('active');
    } else {
        return i18n.t('inactive');
    }
};
