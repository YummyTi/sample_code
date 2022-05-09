import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import Routings from '@src/app/routes/index';

import {useLanguageStore} from '@shared/store/language';

import {stylesContainer} from './app.module.less';
import {withHocs} from './providers';

const App = (): React.ReactElement => {
    const {i18n} = useTranslation();
    const lang = useLanguageStore((state) => state.lang);

    useEffect(() => {
        i18n.changeLanguage(lang?.value || 'ru');
    }, []);

    return (
        <div className={stylesContainer}>
            <Routings />
        </div>
    );
};

export default withHocs(App);
