import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {useScheduleStore} from '@src/shared/store/schedule';

import Form from '../Form';
import FormBody from '../FormBody';
import styles from './index.module.scss';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ModalBody = () => {
    const {t} = useTranslation();
    const {step, setStep, stepData} = useScheduleStore(
        (state) => ({...state}),
        shallow,
    );

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setStep(newValue);
    };

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <Tabs
                    value={step}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label={t('md')} {...a11yProps(0)} />
                    <Tab
                        disabled={stepData?.length < 1}
                        label={`${t('td')}-${t('fd')}`}
                        {...a11yProps(1)}
                    />
                    <Tab
                        disabled={stepData?.length < 2}
                        label={t('std')}
                        {...a11yProps(2)}
                    />
                    <Tab
                        disabled={stepData?.length < 3}
                        label={t('sd')}
                        {...a11yProps(3)}
                    />
                </Tabs>
            </div>

            <FormBody value={step} index={0}>
                <Form />
            </FormBody>
            <FormBody value={step} index={1}>
                <Form />
            </FormBody>
            <FormBody value={step} index={2}>
                <Form />
            </FormBody>
            <FormBody value={step} index={3}>
                <Form />
            </FormBody>
        </div>
    );
};

export default ModalBody;
