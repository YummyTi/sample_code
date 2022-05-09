import cx from 'classnames';
import React, {useEffect, useRef} from 'react';

import {useGeneratePDF} from '@src/widgets/PdfController';

import {KppTablesComponent} from '../ControlIntervalTable';
import {ParkTable} from '../ParkTable';
import {RaceTable} from '../RaceTable';
import s from './index.module.scss';

export const ControlIntervalPrint = () => {
    const componentRef = useRef(null);
    const pageStyle =
        '@media print { body { -webkit-print-color-adjust: exact; } @page { size: A2; margin: 200mm !important }}';
    const {handlePrint} = useGeneratePDF(componentRef, pageStyle);

    useEffect(() => {
        handlePrint();
    }, []);

    return (
        <div className={cx(s.mainContainer)} ref={componentRef}>
            <div className={cx(s.additionalInfo)}>
                <ParkTable />
                <RaceTable />
            </div>
            <div className={cx(s.kppTablePrint)}>
                <KppTablesComponent />
            </div>
        </div>
    );
};
