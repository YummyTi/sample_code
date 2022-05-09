import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import React from 'react';
import shallow from 'zustand/shallow';

import {useOrderStore} from '@src/shared/store/order';
import {useParkStore} from '@src/shared/store/park';

import RouteList from '../RouteList';
import styles from './index.module.scss';
import {Accordion, AccordionDetails, AccordionSummary} from './styles';

const OrderList = () => {
    const {parks} = useParkStore((state) => ({...state}), shallow);
    const {expanded, setExpanded} = useOrderStore(
        (state) => ({...state}),
        shallow,
    );

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div className={styles.container}>
            {parks.map((item) => (
                <Accordion
                    key={item.park_id}
                    expanded={expanded === item.park_id?.toString()}
                    onChange={handleChange(item?.park_id?.toString())}
                    className={cx([
                        expanded === item.park_id.toString() && 'expanded',
                    ])}
                >
                    <AccordionSummary
                        aria-controls={item.park}
                        id={item.park}
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>{item.license_number}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <RouteList />
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default React.memo(OrderList);
