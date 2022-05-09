import React from 'react';

import LogoIcon from '@src/images/svgs/LogoIcon';

import s from './index.module.scss';

const Logo = () => {
    return (
        <div className={s.wrapLogo}>
            <LogoIcon className={s.logo} />
            <div className={s.wrapLogoText}>
                <h3 className={s.logoTitle}>ASDUM</h3>
                <p className={s.subTitle}>gps monitoring company</p>
            </div>
        </div>
    );
};

export default Logo;
