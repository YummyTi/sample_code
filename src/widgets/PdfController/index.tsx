import React from 'react';
import {useReactToPrint} from 'react-to-print';

export const useGeneratePDF = (componentRef: any, pageStyle: string) => {
    console.log('Ref: ', componentRef);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle:
            pageStyle ||
            '@media print { body { -webkit-print-color-adjust: exact; } @page { size: A4; margin: 200mm !important }}',
    });

    return {handlePrint};
};
