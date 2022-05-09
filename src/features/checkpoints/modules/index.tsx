import {Button, IconButton} from '@mui/material';
import React, {FC} from 'react';
import {Control, useFieldArray} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import WhitePlusIcon from '@src/images/svgs/WhitePlusIcon';
import WhiteTrashIcon from '@src/images/svgs/WhiteTrashIcon';
import InputController from '@src/shared/components/InputController';

import {ISubmitStation} from '../lib';
import {styles} from '../lib';

type Props = {
    control: Control<ISubmitStation, any> | undefined;
};

const AddibleRoutes: FC<Props> = ({control}) => {
    const {t} = useTranslation();
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'routesInputs',
    });

    return (
        <>
            {fields?.map((item, index) => (
                <div className="routeDiv" key={item.id}>
                    <InputController
                        control={control}
                        name={`routesInputs.${index}.route`}
                        sx={styles.routeInput}
                    />
                    <IconButton
                        sx={{padding: 0}}
                        size="small"
                        onClick={() => remove(index)}
                    >
                        <div className="trashDiv">
                            <WhiteTrashIcon className="trashIcon" />
                        </div>
                    </IconButton>
                </div>
            ))}
            <Button className="btnAdd" onClick={() => append({route: ''})}>
                <WhitePlusIcon className="plusIcon" />
                {t('add')}
            </Button>
        </>
    );
};

export default AddibleRoutes;
