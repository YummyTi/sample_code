import React, {Component} from 'react';
import {I18nextProvider} from 'react-i18next';

import i18n from '@shared/localization/i18n';

const withi18n = (component: Component) => () =>
    (
        <I18nextProvider i18n={i18n}>
            {/* @ts-ignore */}
            {component()}
        </I18nextProvider>
    );

export default withi18n;
