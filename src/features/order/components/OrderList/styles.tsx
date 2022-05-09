import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import {styled} from '@mui/material/styles';
import React from 'react';

import ArrowForward from '@src/images/svgs/ArrowForward';

export const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} {...props} />
))(({theme}) => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },

    '& .css-7fb0v8-MuiPaper-root-MuiAccordion-root': {
        backgroundColor: 'transparent',
    },
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForward />} {...props} />
))(({theme}) => ({
    backgroundColor: '#606EEA',
    color: '#fff !important',
    borderRadius: '3px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '17px',
    lineHeight: '32px',

    // '& .Mui-expanded': {
    //     backgroundColor: '#fff',
    // },

    '& .css-yw020d-MuiAccordionSummary-expandIconWrapper': {
        '& svg': {
            // color: '#fff !important',
        },
    },

    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(-90deg)',
        color: '#C7C7D2',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    background: 'transparent !important',
}));
